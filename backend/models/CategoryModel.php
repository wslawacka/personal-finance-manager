<?php

class CategoryModel {
  private $conn;

  public function __construct($db) {
    $this->conn = $db;
  }

  // CREATE TABLE categories (
  //   id INT AUTO_INCREMENT PRIMARY KEY,
  //   name VARCHAR(50) UNIQUE NOT NULL,
  //   user_id INT NOT NULL,
  //   FOREIGN KEY (user_id) REFERENCES users(id)
  // );

  public function createCategory($name, $user_id) {
    $query = "INSERT INTO categories (name, user_id) VALUES (:name, :user_id)";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':user_id', $user_id);
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

  public function updateCategory($id, $name, $user_id) {
    $query = "UPDATE categories SET name = :name, user_id = :user_id WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':user_id', $user_id);
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