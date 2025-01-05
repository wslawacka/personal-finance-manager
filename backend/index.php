<?php

require_once 'config/Database.php';
require_once 'models/UserModel.php';
require_once 'models/CategoryModel.php';
require_once 'models/TransactionModel.php';
require_once 'controllers/UserController.php';
require_once 'controllers/CategoryController.php';
require_once 'controllers/TransactionController.php';

$database = new Database();
$db = $database->getConnection();

$userModel = new UserModel($db);
$categoryModel = new CategoryModel($db);
$transactionModel = new TransactionModel($db);

$userController = new UserController($userModel);
$categoryController = new CategoryController($categoryModel);
// $transactionController = new TransactionController($transactionModel);

//$userController->registerUser('John Doe', 'john@example.com', 'password123W!');
// $userController->loginUser('John Doe', 'password123W!');
// $userController->logoutUser();

//$userController->deleteUser(1);

$userController->deleteUser(3); 
?>