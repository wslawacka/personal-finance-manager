<?php
class TransactionController {
  private $transactionModel;

  public function __construct($transactionModel) {
    $this->transactionModel = $transactionModel;
  }

  public function addTransaction($user_id, $category_id, $type, $amount, $date, $description) {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }
    try {
      $transaction = $this->transactionModel->createTransaction($user_id, $category_id, $type, $amount, $date, $description);
      return $transaction;
    } catch (PDOException $e) {
      throw new Exception("Failed to add transaction: " . $e->getMessage());
    }
  }

  public function editTransaction($id, $user_id, $category_id, $type, $amount, $date, $description) {

    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }
    try {
      return $this->transactionModel->updateTransaction($id, $user_id, $category_id, $type, $amount, $date, $description);
    } catch (PDOException $e) {
      throw new Exception("Failed to edit transaction: " . $e->getMessage());
    }
  }

  public function getTransactions($user_id) {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }
    try {
      return $this->transactionModel->getAllTransactionsByUserId($user_id);
    } catch (PDOException $e) {
      throw new Exception("Failed to get transactions: " . $e->getMessage());
    }
  }

  public function deleteTransaction($id) {
    if (session_status() === PHP_SESSION_NONE) {
      session_start();
  }
    try {
      return $this->transactionModel->deleteTransaction($id);
    } catch (PDOException $e) {
      throw new Exception("Failed to delete transaction: " . $e->getMessage());
    }
  }
}
?>