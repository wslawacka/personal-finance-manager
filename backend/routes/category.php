<?php
// allow requests from the frontend
header('Access-Control-Allow-Origin: http://localhost:5173');
// allow cookies
header('Access-Control-Allow-Credentials: true');           
// allow methods
header('Access-Control-Allow-Methods: POST, GET, OPTIONS'); 
// allow headers
header('Access-Control-Allow-Headers: Content-Type');     

// handle preflight requests - CORS
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// include necessary files
require_once '../models/CategoryModel.php';
require_once '../controllers/CategoryController.php';
require_once '../config/Database.php';

// start session
session_start();

// create database connection
$database = new Database();
$db = $database->getConnection();

// create category model and controller
$categoryModel = new CategoryModel($db);
$categoryController = new CategoryController($categoryModel);

// handle POST requests
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'];
  switch($action) {
    case 'add':
      $user_id = $_SESSION['user_id'];
      $name = $_POST['name'];
      $type = $_POST['type'];
      $categoryController->addCategory($name, $user_id, $type);
      echo json_encode(['success' => true, 'message' => 'Category added successfully', 'id' => $categoryController->getCategoryId($name, $user_id, $type)['id']]);
      break;
  }
}

// handle GET requests
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