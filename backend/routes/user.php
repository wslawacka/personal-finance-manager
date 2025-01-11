<?php
// allow requests from the frontend
header('Access-Control-Allow-Origin: http://localhost:5173');
// allow cookies
header('Access-Control-Allow-Credentials: true');            
// allow methods
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');  
// allow headers
header('Access-Control-Allow-Headers: Content-Type');     

// handle preflight requests - CORS
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// include necessary files
require_once '../models/UserModel.php';
require_once '../controllers/UserController.php';
require_once '../config/Database.php';

// create database connection
$database = new Database();
$db = $database->getConnection();

// create user model and controller
$userModel = new UserModel($db);
$userController = new UserController($userModel);

// handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? null;
  switch ($action) {
    case 'register':
      $username = $_POST['username'];
      $email = $_POST['email'];
      $password = $_POST['password'];
      $confirmPassword = $_POST['confirmPassword'];
      $response = $userController->registerUser($username, $email, $password, $confirmPassword);
      break;
    case 'login':
      $username = $_POST['username'];
      $password = $_POST['password'];
      $response = $userController->loginUser($username, $password);
      break;
    case 'logout':
      $response = $userController->logoutUser();
      break;
    default:
      $response = ['success' => false, 'message' => 'Invalid request'];
      break;
  }
  echo json_encode($response);
}
?> 