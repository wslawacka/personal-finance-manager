<?php

require_once 'config/Database.php';
require_once 'models/UserModel.php';
require_once 'models/CategoryModel.php';
require_once 'models/TransactionModel.php';
require_once 'controllers/UserController.php';
require_once 'controllers/CategoryController.php';
require_once 'controllers/TransactionController.php';
require_once 'services/EmailService.php';

$database = new Database();
$db = $database->getConnection();

$userModel = new UserModel($db);
$categoryModel = new CategoryModel($db);
$transactionModel = new TransactionModel($db);

$userController = new UserController($userModel);
$categoryController = new CategoryController($categoryModel);
$transactionController = new TransactionController($transactionModel);

//$categoryController->addCategory('Test category', 19);
// $categoryController->addCategory('Test category', 20);
// $categoryController->addCategory('Test category2', 20);
// $categoryController->addCategory('Test category3', 20);
// $categoryController->addCategory('Test category4', 20);

// $categoryController->addCategory('Test category5', 19);
// $categoryController->addCategory('Test category6', 19);

$transactionController->addTransaction(20, 6, 'income', 320, '2024-01-08', 'Test transaction');
$transactionController->addTransaction(20, 7, 'income', 180, '2024-01-15', 'Test transaction2');
$transactionController->addTransaction(20, 8, 'expense', 10, '2024-01-11', 'Test transaction3');

$transactionController->addTransaction(19, 10, 'expense', 340, '2024-01-07', 'Test transaction4');
$transactionController->addTransaction(19, 11, 'income', 1000, '2024-01-05', 'Test transaction5');


// $emailService = new EmailService();

// $emailService->sendWelcomeEmail('slawacka@wp.pl', 'Werunia');
// $emailService->sendWelcomeEmail('kacper.b.ksiazek@gmail.com', 'Kapisio');

?>