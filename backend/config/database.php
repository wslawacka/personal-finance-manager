<?php
class Database {
  private $db_hostname = 'localhost';
  private $db_username = 'root';
  private $db_password = '';
  private $db_name = 'personal_finance_manager';
  public $conn;

  // Get the database connection
  public function getConnection() {
    $this->conn = null;
    // Try to connect to the database
    try {
      $this->conn = new PDO("mysql:host=$this->db_hostname;dbname=$this->db_name", $this->db_username, $this->db_password);
      // If connection fails, display an error message
    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
    // Return the database connection
    return $this->conn;
  }
}






