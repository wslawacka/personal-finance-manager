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
require_once '../models/TransactionModel.php';
require_once '../controllers/TransactionController.php';
require_once '../config/Database.php';

// start session
session_start();

// create database connection
$database = new Database();
$db = $database->getConnection();

// create transaction model and controller
$transactionModel = new TransactionModel($db);
$transactionController = new TransactionController($transactionModel);

// handle POST requests
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
    case 'edit':
      $id = $_POST['id'];
      $user_id = $_SESSION['user_id'];
      $category_id = $_POST['category_id'];
      $type = $_POST['type'];
      $amount = $_POST['amount'];
      $date = $_POST['date'];
      $description = $_POST['description'];
      $transactionController->editTransaction($id, $user_id, $category_id, $type, $amount, $date, $description);
      echo json_encode(['success' => true, 'message' => 'Transaction edited successfully']);
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