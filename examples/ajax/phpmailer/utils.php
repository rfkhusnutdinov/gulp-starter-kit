<?php
/**
 * @param array associative array $array with data
 * @return string unchanged
 */
function form_mail_body(array $array, )
{
  $body = "";

  foreach ( $array as $key => $value ) {
    if ( $value != "" ) {
      $key = array_key_exists($key, FIELDS_ASSOCIATION) ? FIELDS_ASSOCIATION[$key] : $key;

      if ($key != "agree") {
        $body .= "
          <tr style='background-color: #f8f8f8;'>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>" . ( is_array($value) ? htmlspecialchars(implode(', ', $value)) : nl2br(htmlspecialchars($value) )) ."</td>
          </tr>
        ";
      }
    }
  }

  return "<table style='width: 100%;'>$body</table>";
}

/**
 * @param array associative array $array with data
 * @return string unchanged
 */
function form_telegram_text(array $array)
{
  $text = "";

  foreach ( $array as $key => $value ) {
    if ( $value != "" ) {
      $key = array_key_exists($key, FIELDS_ASSOCIATION) ? FIELDS_ASSOCIATION[$key] : $key;

      $text .= "<b>$key:</b> ". ( is_array($value) ? htmlspecialchars(trim(implode(', ', $value))) : htmlspecialchars(trim($value)) ) . "\n";
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
      }
      else {
        $filesByInput[] = $infoArr;
        break;
      }
    }
    $files2 = array_merge($files2,$filesByInput);
  }
  $files3 = [];
  foreach($files2 as $file) {
    if (!$file['error']) $files3[] = $file;
  }
  return $files3;
}
