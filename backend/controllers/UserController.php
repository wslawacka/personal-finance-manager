<?php

// include the email service
require_once __DIR__ . '/../services/EmailService.php';

class UserController {
  private $userModel;

  public function __construct($userModel) { 
    $this->userModel = $userModel;
  }

  public function registerUser($username, $email, $password, $confirmPassword) {

    if (session_status() === PHP_SESSION_NONE) {
      session_start();
    }

    // check if the username is already taken
    if ($this->userModel->getUserByUsername($username)) {
      return ['success' => false, 'message' => 'Username already taken'];
    }
    // check if the email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      return ['success' => false, 'message' => 'Invalid email format'];
    }
    // check if the email is already taken
    if ($this->userModel->getUserByEmail($email)) {
      return ['success' => false, 'message' => 'Email already taken'];
    }
    // check if the password and confirm password match
    if ($password !== $confirmPassword) {
      return ['success' => false, 'message' => 'Passwords do not match'];
    }
    // check if the password is at least 8 characters long
    if (strlen($password) < 8) {
      return ['success' => false, 'message' => 'Password must be at least 8 characters long'];
    }
    // check if the password contains at least one uppercase letter, one lowercase letter, one number, and one special character
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password)) {
      return ['success' => false, 'message' => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'];
    }

    try {
      $user = $this->userModel->createUser($username, $email, $password);
      $emailService = new EmailService();
      $emailService->sendWelcomeEmail($email, $username);
      return ['success' => true, 'message' => 'User registered successfully'];
    } catch (PDOException $e) {
      return ['success' => false, 'message' => 'Failed to register user: ' . $e->getMessage()];
    }
  }

  public function loginUser($username, $password) {

    if (session_status() === PHP_SESSION_NONE) {
      session_start();
    }
    // regenerate the session id
    session_regenerate_id(true);
    
    try {
        $user = $this->userModel->getUserByUsername($username);
        
        // check if user exists and if the password is correct
        if (!$user || !password_verify($password, $user['password_hash'])) {
          return ['success' => false, 'message' => 'Invalid username or password'];
        }

        // set the session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
       
        return ['success' => true, 'message' => 'User logged in successfully', 'username' => $user['username']];
    } catch (PDOException $e) {
        return ['success' => false, 'message' => 'Failed to login user: ' . $e->getMessage()];
    }
  }

  public function logoutUser() {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
    }
    session_unset();
    session_destroy();

    // delete the session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }
    return ['success' => true, 'message' => 'User logged out successfully'];
  }

  public function getUserProfile($id) {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }
    try {
      return $this->userModel->getUserById($id);
    } catch (PDOException $e) {
      return ['success' => false, 'message' => 'Failed to get user by id: ' . $e->getMessage()];
    }
  }

  public function deleteUser($id) {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }
    try {
      return $this->userModel->deleteUser($id);
    } catch (PDOException $e) {
      return ['success' => false, 'message' => 'Failed to delete user: ' . $e->getMessage()];
    }
  }
}
?>