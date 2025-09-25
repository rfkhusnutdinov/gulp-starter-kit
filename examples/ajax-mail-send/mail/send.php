<?php
define("MAIL_FROM_EMAIL", "noreply@site.ru");
define("MAIL_FROM_NAME", "Мой сайт");
define("MAIL_ADDRESSES", [""]);
define("MAIL_SUBJECT", "Заявка с сайта site.ru");
define("SEND_TO_TELEGRAM", false);
define("TELEGRAM_BOT_TOKEN", "");
define("TELEGRAM_CHAT_ID", "");
define("ANTI_SPAM_FIELD", "fullname");
define("FIELD_LABELS", [
    'name' => 'Имя',
    'date' => 'Дата и время заявки (по МСК)',
    'user_ip' => 'IP адрес пользователя'
]);

date_default_timezone_set('Europe/Moscow');
$response = ['status' => '', 'message' => ''];

try {
    if (!empty($_POST[ANTI_SPAM_FIELD])) {
        throw new Exception("Обнаружен спам");
    }

    $_POST['date'] = date('m/d/Y H:i:s');
    $_POST['user_ip'] = $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN';

    $to = implode(",", MAIL_ADDRESSES);
    $subject = "=?UTF-8?B?" . base64_encode(MAIL_SUBJECT) . "?=";

    $boundary = md5(time()); // Для разделения частей письма
    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: multipart/mixed; boundary=\"{$boundary}\"",
        "From: =?UTF-8?B?" . base64_encode(MAIL_FROM_NAME) . "?= <" . MAIL_FROM_EMAIL . ">",
        "Reply-To: " . MAIL_FROM_EMAIL
    ];
    $headers = implode("\r\n", $headers);

    // HTML тело письма
    $htmlBody = generate_html_body($_POST);
    $message = "--{$boundary}\r\n";
    $message .= "Content-Type: text/html; charset=UTF-8\r\n";
    $message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $message .= $htmlBody . "\r\n";

    // Вложения
    foreach (incoming_files() as $file) {
        $content = chunk_split(base64_encode(file_get_contents($file['tmp_name'])));
        $filename = $file['name'];
        $message .= "--{$boundary}\r\n";
        $message .= "Content-Type: application/octet-stream; name=\"{$filename}\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
        $message .= $content . "\r\n";
    }

    $message .= "--{$boundary}--";

    // Отправка письма
    if (!mail($to, $subject, $message, $headers, "-f" . MAIL_FROM_EMAIL)) {
        throw new Exception("Ошибка при отправке почты");
    }

    // Telegram уведомление
    if (SEND_TO_TELEGRAM && !empty(TELEGRAM_BOT_TOKEN) && !empty(TELEGRAM_CHAT_ID)) {
        $text = generate_telegram_text($_POST);
        if ($text) {
            $data = [
                'chat_id' => TELEGRAM_CHAT_ID,
                'text' => "<b>" . MAIL_SUBJECT . "</b>\n\n" . $text,
                'parse_mode' => 'HTML'
            ];
            file_get_contents("https://api.telegram.org/bot" . TELEGRAM_BOT_TOKEN . "/sendMessage?" . http_build_query($data));
        }
    }

    $response['status'] = 'success';
    $response['message'] = 'Сообщение успешно отправлено';

} catch (Exception $e) {
    $response['status'] = 'error';
    $response['message'] = "Сообщение не было отправлено. Причина: " . $e->getMessage();
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode($response);

// ================== Функции ====================

function humanize_key($key) {
    $key = preg_replace('/[_\-]+/', ' ', $key);
    $key = preg_replace('/([a-z])([A-Z])/', '$1 $2', $key);
    return ucfirst(strtolower($key));
}

function generate_html_body(array $post) {
    $body = "";
    foreach ($post as $key => $value) {
        if ($value != "") {
            $key = FIELD_LABELS[$key] ?? humanize_key($key);
            $body .= "
            <tr style='background-color: #f8f8f8;'>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
                <td style='padding: 10px; border: #e9e9e9 1px solid;'>" .
                (is_array($value) ? htmlspecialchars(implode(', ', $value)) : nl2br(htmlspecialchars($value))) .
                "</td>
            </tr>";
        }
    }
    return "<table style='width: 100%; border-collapse: collapse;'>$body</table>";
}

function generate_telegram_text(array $array) {
    $text = "";
    foreach ($array as $key => $value) {
        if ($value != "") {
            $key = FIELD_LABELS[$key] ?? humanize_key($key);
            $text .= "<b>$key:</b> " . (is_array($value) ? htmlspecialchars(trim(implode(', ', $value))) : htmlspecialchars(trim($value))) . "\n";
        }
    }
    return trim(preg_replace('/\<br(\s*)?\/?\>/i', "\n", $text));
}

function incoming_files() {
    $files = $_FILES;
    $files2 = [];
    foreach ($files as $input => $infoArr) {
        $filesByInput = [];
        foreach ($infoArr as $key => $valueArr) {
            if (is_array($valueArr)) {
                foreach($valueArr as $i=>$value) {
                    $filesByInput[$i][$key] = $value;
                }
            } else {
                $filesByInput[] = $infoArr;
                break;
            }
        }
        $files2 = array_merge($files2, $filesByInput);
    }
    $files3 = [];
    foreach($files2 as $file) {
        if (!isset($file['error']) || !$file['error']) $files3[] = $file;
    }
    return $files3;
}
