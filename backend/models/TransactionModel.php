<?php
class TransactionModel {
  private $conn;

  public function __construct($db) {
    $this->conn = $db;
  }

  public function createTransaction($user_id, $category_id, $type, $amount, $date, $description) {
    $query = "INSERT INTO transactions (user_id, category_id, type, amount, date, description) VALUES (:user_id, :category_id, :type, :amount, :date, :description)";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':description', $description);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getTransactionById($id) {
    $query = "SELECT * FROM transactions WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getAllTransactionsByUserId($user_id) {
    $query = "SELECT * FROM transactions WHERE user_id = :user_id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function updateTransaction($id, $user_id, $category_id, $type, $amount, $date, $description) {
    $query = "UPDATE transactions SET user_id = :user_id, category_id = :category_id, type = :type, amount = :amount, date = :date, description = :description WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':category_id', $category_id);
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':date', $date);
    $stmt->bindParam(':description', $description);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function deleteTransaction($id) {
    $query = "DELETE FROM transactions WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return;
  }
}
?>