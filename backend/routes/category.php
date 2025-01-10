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

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'];
  switch($action) {
    case 'add':
      $user_id = $_SESSION['user_id'];
      $name = $_POST['name'];
      $type = $_POST['type'];
      $categoryController->addCategory($name, $user_id, $type);
      echo json_encode(['success' => true, 'message' => 'Category added successfully']);
      break;
  }
}

if($_SERVER['REQUEST_METHOD'] === 'GET') {
  $action = $_GET['action'];
  switch($action) {
    case 'list':
      $user_id = $_SESSION['user_id'];
      $categories = $categoryController->listCategories($user_id);
      echo json_encode($categories);
      break;
  }
}


?>