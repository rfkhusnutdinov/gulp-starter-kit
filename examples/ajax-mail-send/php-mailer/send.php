<?php
require 'config.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
require 'phpmailer/utils.php';

$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->isHTML(true);
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  $mail->SMTPDebug = 2;
  $mail->Debugoutput = function ($str, $level) {
    $GLOBALS['status'][] = $str;
  };
  $mail->Host       = SMTP_HOST;
  $mail->Username   = SMTP_USERNAME;
  $mail->Password   = SMTP_PASSWORD;
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->Subject    = MAIL_SUBJECT;
  $mail->setFrom(SMTP_USERNAME, MAIL_FROM_NAME);

  foreach ( MAIL_ADDRESSES as $value ) {
    $mail->addAddress($value);
  }

  foreach ( incoming_files($_FILES) as $file ) {
    if (!empty($file['name'])) {
      $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name']));
      $filename = $file['name'];
      if (move_uploaded_file($file['tmp_name'], $uploadfile)) {
        $mail->addAttachment($uploadfile, $filename);
        $rfile[] = "Файл $filename прикреплён";
      } else {
        $rfile[] = "Не удалось прикрепить файл $filename";
      }
    }
  }

  date_default_timezone_set('Europe/Moscow');
  $_POST["date"] = date('m/d/Y h:i:s', time());

  $_POST["user_ip"] = $_SERVER['REMOTE_ADDR'];

  $mail->Body = generate_html_body($_POST);

  if (empty($_POST[ANTI_SPAM_FIELD])) {
    if ($mail->send()) {
      if (SEND_TO_TELEGRAM) {
        $text = generate_telegram_text($_POST);

        if (!empty($text)) {
          $apiToken = TELEGRAM_BOT_TOKEN;

          $data = [
            'chat_id' => TELEGRAM_CHAT_ID,
            'text' => "<b>" . MAIL_SUBJECT . "</b>\n\n" . $text,
            'parse_mode' => 'HTML',
          ];

          $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" . http_build_query($data));
        }
      }

      $status = "success";
      $message = "Сообщение успешно отправлено";
    }
  } else {
    $status = "error";
    $message = "Сообщение не было отправлено. Обнаружен спам";
  }
} catch (Exception $e) {
  $status = "error";
  $message = "Сообщение не было отправлено. Причина ошибки: {$e->getMessage()}";
} catch (Error $e) {
  $status = "error";
  $message = "Сообщение не было отправлено. Причина ошибки: {$e->getMessage()}";
}

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(["status" => $status, "message" => $message]);
