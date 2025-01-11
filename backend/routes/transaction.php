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
require_once '../models/TransactionModel.php';
require_once '../controllers/TransactionController.php';
require_once '../config/Database.php';

session_start();

// Create database connection
$database = new Database();
$db = $database->getConnection();

// Create transaction model and controller
$transactionModel = new TransactionModel($db);
$transactionController = new TransactionController($transactionModel);

// switch statement to handle the request
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST['action'];
  switch($action) {
    case 'add':
      $user_id = $_SESSION['user_id'];
      $category_id = $_POST['category_id'];
      $type = $_POST['type'];
      $amount = $_POST['amount'];
      $date = $_POST['date'];
      $description = $_POST['description'];
      $transactionController->addTransaction($user_id, $category_id, $type, $amount, $date, $description);
      echo json_encode(['success' => true, 'message' => 'Transaction added successfully']);
      break;
    case 'delete':
      $id = $_POST['id'];
      $transactionController->deleteTransaction($id);
      echo json_encode(['success' => true, 'message' => 'Transaction deleted successfully']);
      break;
  }
}

if($_SERVER['REQUEST_METHOD'] === 'GET') {
  $action = $_GET['action'];
  switch($action) {
    case 'get':
      $user_id = $_SESSION['user_id'];
      $transactions = $transactionController->getTransactions($user_id);
      echo json_encode($transactions);
      break;
  }
}
?>