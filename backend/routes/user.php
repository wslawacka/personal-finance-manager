<?php
// Force PHP to return JSON
header('Content-Type: application/json');

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

// Ensure we can read the input
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

// Get the action from the request
$action = $data['action'] ?? '';

// Handle different actions
switch ($action) {
  // Register a new user
    case 'register':
      $response = $userController->registerUser($data['username'], $data['email'], $data['password']);
      echo json_encode($response);
      break;
  // Login a user
    case 'login':
      $response = $userController->loginUser($data['username'], $data['password']);
      echo json_encode($response);
      break;
  // Default case - handle invalid action
    default:
      http_response_code(400);
      echo json_encode([
          'error' => 'Invalid action',
          'received_action' => $action,
          'received_data' => $data,
          'raw_input' => $rawData
      ]);
}
?> 