<?php

require __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

// send email after user registration
class EmailService {
  private $mailer;

  public function __construct() {
    $this->mailer = new PHPMailer(true);
  }

  // configure mailer for gmail
  private function configureMailer() {
    $this->mailer->setFrom($_ENV['MAIL_USERNAME'], 'Personal Finance Manager');
    $this->mailer->isSMTP();
    $this->mailer->Host = 'smtp.gmail.com'; 
    $this->mailer->SMTPAuth = true;
    $this->mailer->Username = $_ENV['MAIL_USERNAME'];
    $this->mailer->Password = $_ENV['MAIL_PASSWORD'];
    $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $this->mailer->Port = 587;
  }

  public function sendWelcomeEmail($email, $username) {
    try {
      $this->configureMailer();
      $this->mailer->clearAddresses();
      $this->mailer->addAddress($email, $username);
      $this->mailer->isHTML(true);
      $this->mailer->Subject = 'Welcome to Personal Finance Manager!';
      $this->mailer->Body = '<h3>Hello, ' . $username . '!</h3><h4>Thank you for registering.</h4> Your account is now ready to use. <br><br>You can start managing your finances now!<br><br>Best regards,<br>Personal Finance Manager Team<br><br>';
      return $this->mailer->send();
    } catch (Exception $e) {
      echo "Message could not be sent. Mailer Error: {$this->mailer->ErrorInfo}";
      return false;
    }
  }

}

?>
