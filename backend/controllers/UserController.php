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
      return $user;
    } catch (PDOException $e) {
      throw new Exception("Failed to register user: " . $e->getMessage());
    }
    return null;
  }

  public function loginUser($username, $password) {
    try {
        $user = $this->userModel->getUserByUsername($username);
        
        // Check if user exists and password is correct
        if (!$user || !password_verify($password, $user['password_hash'])) {
            return null;
        }

        // Login successful - start session and set user data
        session_start();
        $_SESSION['user_id'] = $user['id'];
        
        // Send success response
        echo json_encode(['success' => true, 'user' => $user]);
        echo "User logged in successfully" . "<br>";
        
        return $user;
    } catch (PDOException $e) {
        throw new Exception("Failed to login user: " . $e->getMessage());
    }
  }

  public function logoutUser() {
    session_unset();
    session_destroy();

    echo "User logged out successfully" . "<br>";

    return;
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