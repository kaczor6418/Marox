<?php
error_reporting(E_ERROR | E_PARSE);
if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

    header('Content-Type: text/html; charset=utf-8');
    die('Dostęp zabroniony');

}

if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {

      $to = 'marox@marox.pl';
      $subject = $_POST['subject'];
      $message = $_POST['message'];
      $name = $_POST['name'];
      $headers = 'From: ' . $_POST['email'] . "\r\n" .
          'Reply-To: ' . $_POST['email'] . "\r\n" .
          'Content-Type: text/plain;charset=utf-8\r\n' .
          'X-Mailer: PHP/' . phpversion();

      $mail_sent = mail($to, $subject, $message, $headers);

      if($mail_sent) {
          echo json_encode(array(
              'success' => 'Wiadomość została wysłana poprawnie'
          ));
      } else {
          echo json_encode(array(
              'error' => 'Wystąpił błąd podczas wysyłania wiadomości'
          ));
      }
} else {

  echo json_encode(array(
      'error' => 'Przesłano niepoprawne pola formularza'
  ));
}
