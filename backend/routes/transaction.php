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
require_once '../models/TransactionModel.php';
require_once '../controllers/TransactionController.php';
require_once '../config/Database.php';

// Create database connection
$database = new Database();
$db = $database->getConnection();

//start session
session_start();

// Create transaction model and controller
$transactionModel = new TransactionModel($db);
$transactionController = new TransactionController($transactionModel);

// Get user_id from session storage
$user_id = $_SESSION['user_id'];

// Get all transactions
$transactions = $transactionController->getTransactions($user_id);

echo json_encode($transactions);

?>