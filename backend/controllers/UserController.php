<?php

class UserController {
  private $userModel;

  public function __construct($userModel) { 
    $this->userModel = $userModel;
  }

  public function registerUser($username, $email, $password) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      throw new ValidationException("Invalid email format");
    }
    if (strlen($password) < 8) {
      throw new ValidationException("Password must be at least 8 characters long");
    }
    // password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password)) {
      throw new ValidationException("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }
  
    try {
      $user = $this->userModel->createUser($username, $email, $password);
      return $user;
    } catch (PDOException $e) {
      throw new Exception("Failed to register user: " . $e->getMessage());
    }
    return null;
  }

  public function loginUser($username, $password) {
    try {
      $user = $this->userModel->getUserByUsername($username);
      if ($user && password_verify($password, $user['password_hash'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        return $user;
      }
      return null;
    } catch (PDOException $e) {
      throw new Exception("Failed to login user: " . $e->getMessage());
    }
  }

  public function logoutUser() {
    session_unset();
    session_destroy();
    return;
  }

  public function getUserProfile($id) {
    try {
      return $this->userModel->getUserById($id);
    } catch (PDOException $e) {
      throw new Exception("Failed to get user by id: " . $e->getMessage());
    }
  }
}
?>