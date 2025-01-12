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

  public function getCategoryId($name, $user_id, $type) {
    $query = "SELECT id FROM categories WHERE name = :name AND user_id = :user_id AND type = :type";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':type', $type);
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

  public function deleteCategory($id, $cascade) {

    try {
      // Check for linked transactions
      $query = "SELECT COUNT(*) AS transaction_count FROM transactions WHERE category_id = :category_id";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':category_id', $id);
      $stmt->execute();
      $result = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($result['transaction_count'] > 0 && !$cascade) {
          echo json_encode([
              'success' => false,
              'message' => 'This category has linked transactions. Do you want to delete the category along with its linked transactions?',
              'transaction_count' => $result['transaction_count']
          ]);
          exit;
      }

      // Delete linked transactions if cascade is true
      if ($cascade) {
          $query = "DELETE FROM transactions WHERE category_id = :category_id";
          $stmt = $this->conn->prepare($query);
          $stmt->bindParam(':category_id', $id);
          $stmt->execute();
      }

      // Delete the category
      $query = "DELETE FROM categories WHERE id = :id";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':id', $id);
      $stmt->execute();

      echo json_encode(['success' => true, 'message' => 'Category deleted successfully']);
  } catch (Exception $e) {
      // Catch any errors and return a structured response
      echo json_encode(['success' => false, 'message' => 'An unexpected error occurred: ' . $e->getMessage()]);
  }
}
}
?>