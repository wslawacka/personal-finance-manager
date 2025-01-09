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

require_once '../models/CategoryModel.php';
require_once '../controllers/CategoryController.php';
require_once '../config/Database.php';

session_start();

$database = new Database();
$db = $database->getConnection();

$categoryModel = new CategoryModel($db);
$categoryController = new CategoryController($categoryModel);

try {
  $user_id = $_SESSION['user_id'];
  $categories = $categoryController->listCategories($user_id);
  echo json_encode($categories);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  exit;
}


?>