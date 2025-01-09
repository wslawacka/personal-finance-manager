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

// //start session
// session_start();

// Create transaction model and controller
$transactionModel = new TransactionModel($db);
$transactionController = new TransactionController($transactionModel);


// // Get user_id from session storage
// $user_id = $_SESSION['user_id'];

// // Get all transactions
// $transactions = $transactionController->getTransactions($user_id);

// echo json_encode($transactions);


try {
  $user_id = $_SESSION['user_id'];
  $transactions = $transactionController->getTransactions($user_id);
  echo json_encode($transactions);
} catch (Exception $e) {
  echo json_encode(['success' => false, 'error' => $e->getMessage()]);
  exit;
}
  

?>