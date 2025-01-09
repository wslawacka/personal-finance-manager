<?php
header('Access-Control-Allow-Origin: http://localhost:5173'); // Frontend URL
header('Access-Control-Allow-Credentials: true');            // Allow cookies
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');  // Allowed methods
header('Access-Control-Allow-Headers: Content-Type');     

// Handle preflight requests - CORS 
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include necessary files
require_once '../models/UserModel.php';
require_once '../controllers/UserController.php';
require_once '../config/Database.php';

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Create user model and controller
$userModel = new UserModel($db);
$userController = new UserController($userModel);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'] ?? null;
  switch ($action) {
    case 'register':
      $username = $_POST['username'];
      $email = $_POST['email'];
      $password = $_POST['password'];
      $response = $userController->registerUser($username, $email, $password);
      if ($response['success']) {
        $response['message'] = 'User registered successfully';
      } else {
        $response['message'] = 'User registration failed';
      }
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
      $response = ['error' => 'Invalid request'];
      break;
  }
  echo json_encode($response);
}



?> 