<?php
class UserModel {
  private $conn;

  public function __construct($db) {
    $this->conn = $db;
  }

  public function createUser($username, $email, $password) {
    $query = "INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)";
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password_hash', $password_hash);
    $stmt->execute();
    // return created user
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getUserById($id) {
    $query = "SELECT * FROM users WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getUserByUsername($username) {
    $query = "SELECT * FROM users WHERE username = :username";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getUserByEmail($email) {
    $query = "SELECT * FROM users WHERE email = :email";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function getAllUsers() {
    $query = "SELECT * FROM users";
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function updateUser($id, $username, $email, $password) {
    $query = "UPDATE users SET username = :username, email = :email, password_hash = :password_hash WHERE id = :id";
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password_hash', $password_hash);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function deleteUser($id) {
    $query = "DELETE FROM users WHERE id = :id";
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return;
  }
}
?>
