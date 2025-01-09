<?php

class UserController {
  private $userModel;

  public function __construct($userModel) { 
    $this->userModel = $userModel;
  }

  public function registerUser($username, $email, $password) {
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      throw new Exception("Invalid email format");
    }
    if (strlen($password) < 8) {
      throw new Exception("Password must be at least 8 characters long");
    }
    // password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password)) {
      throw new Exception("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }
  
    try {
      $user = $this->userModel->createUser($username, $email, $password);
      return ['success' => true, 'message' => 'User registered successfully'];
    } catch (PDOException $e) {
      return ['success' => false, 'message' => 'Failed to register user: ' . $e->getMessage()];
    }
  }

  public function loginUser($username, $password) {

    // start session
    session_start();

   
    
    try {
        $user = $this->userModel->getUserByUsername($username);
        
        // Check if user exists and password is correct
        if (!$user || !password_verify($password, $user['password_hash'])) {
          return ['success' => false, 'message' => 'Invalid username or password'];
        }

        
        // set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        
        // Send success response
        return ['success' => true, 'message' => 'User logged in successfully', 'user' => $user];
    } catch (PDOException $e) {
        // destroy session
        session_destroy();
        return ['success' => false, 'message' => 'Failed to login user: ' . $e->getMessage()];
    }
  }

  public function logoutUser() {
    // start session
    session_start();

    // unset session variables
    session_unset();

    // destroy session
    session_destroy();

    return ['success' => true, 'message' => 'User logged out successfully'];
  }

  public function getUserProfile($id) {
    try {
      return $this->userModel->getUserById($id);
    } catch (PDOException $e) {
      throw new Exception("Failed to get user by id: " . $e->getMessage());
    }
  }

  public function deleteUser($id) {
    try {
      return $this->userModel->deleteUser($id);
    } catch (PDOException $e) {
      throw new Exception("Failed to delete user: " . $e->getMessage());
    }
  }
}
?>