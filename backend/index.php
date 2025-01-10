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

// $emailService = new EmailService();

// $emailService->sendWelcomeEmail('slawacka@wp.pl', 'Werunia');
// $emailService->sendWelcomeEmail('kacper.b.ksiazek@gmail.com', 'Kapisio');

?>