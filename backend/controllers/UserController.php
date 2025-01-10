<?php

class UserController {
  private $userModel;

  public function __construct($userModel) { 
    $this->userModel = $userModel;
  }

  public function registerUser($username, $email, $password, $confirmPassword) {

    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      return ['success' => false, 'message' => 'Invalid email format'];
    }
    if (strlen($password) < 8) {
      return ['success' => false, 'message' => 'Password must be at least 8 characters long'];
    }
    if ($password !== $confirmPassword) {
      return ['success' => false, 'message' => 'Passwords do not match'];
    }
    // password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password)) {
      return ['success' => false, 'message' => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'];
    }
  
    try {
      $user = $this->userModel->createUser($username, $email, $password);
      return ['success' => true, 'message' => 'User registered successfully'];
    } catch (PDOException $e) {
      return ['success' => false, 'message' => 'Failed to register user: ' . $e->getMessage()];
    }
  }

  public function loginUser($username, $password) {

    session_start();
    session_regenerate_id(true);

    

    header("Set-Cookie: PHPSESSID=" . session_id() . "; path=/; HttpOnly; SameSite=Lax");
    
    try {
        $user = $this->userModel->getUserByUsername($username);

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        
        // Check if user exists and password is correct
        if (!$user || !password_verify($password, $user['password_hash'])) {
          return ['success' => false, 'message' => 'Invalid username or password'];
        }

        // echo "Session ID before regeneration: " . session_id() . "<br>";

        // session_regenerate_id(true);
        
        // echo "Session ID after regeneration: " . session_id() . "<br>";

        // echo $user['username'];;


        // // set session variables
        // $_SESSION['user_id'] = $user['id'];
        // $_SESSION['username'] = $user['username'];
        
        // Send success response
        return ['success' => true, 'message' => 'User logged in successfully', 'username' => $user['username']];
    } catch (PDOException $e) {
        // destroy session
        session_destroy();
        return ['success' => false, 'message' => 'Failed to login user: ' . $e->getMessage()];
    }
  }

  public function logoutUser() {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }

    
session_unset();
session_destroy();

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
      throw new Exception("Failed to get user by id: " . $e->getMessage());
    }
  }

  public function deleteUser($id) {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }
    try {
      return $this->userModel->deleteUser($id);
    } catch (PDOException $e) {
      throw new Exception("Failed to delete user: " . $e->getMessage());
    }
  }
}
?>