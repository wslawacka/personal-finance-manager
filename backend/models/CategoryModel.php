<?php

class CategoryModel {
  private $conn;

  public function __construct($db) {
    $this->conn = $db;
  }

  public function createCategory($name, $user_id, $type) {
    $query = "INSERT INTO categories (name, user_id, type) VALUES (:name, :user_id, :type)";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':type', $type);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getCategoryById($id) {
    $query = "SELECT * FROM categories WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getAllCategoriesByUserId($user_id) {
    $query = "SELECT * FROM categories WHERE user_id = :user_id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function updateCategory($id, $name, $user_id, $type) {
    $query = "UPDATE categories SET name = :name, user_id = :user_id, type = :type WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':type', $type);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function deleteCategory($id) {
    $query = "DELETE FROM categories WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return;
  }
}
?>