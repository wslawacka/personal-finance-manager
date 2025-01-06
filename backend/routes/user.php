<?php
// Force PHP to return JSON
header('Content-Type: application/json');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Debug incoming request
error_log("Raw input: " . file_get_contents('php://input'));

require_once '../models/UserModel.php';
require_once '../controllers/UserController.php';
require_once '../config/Database.php';

$database = new Database();
$db = $database->getConnection();

$userModel = new UserModel($db);
$userController = new UserController($userModel);

// Ensure we can read the input
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

// Debug the parsed data
error_log("Parsed data: " . print_r($data, true));

$action = $data['action'] ?? '';

switch ($action) {
    case 'register':
      $response = $userController->registerUser($data['username'], $data['email'], $data['password']);
      echo json_encode($response);
      break;
    case 'login':
      $response = $userController->loginUser($data['username'], $data['password']);
      echo json_encode($response);
      break;
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