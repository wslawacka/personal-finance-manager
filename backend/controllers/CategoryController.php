<?php

class CategoryController {
  private $categoryModel;

  public function __construct($categoryModel) {
    $this->categoryModel = $categoryModel;
  }

  public function addCategory($name, $user_id, $type) {
    try {
      return $this->categoryModel->createCategory($name, $user_id, $type);
    } catch (PDOException $e) {
      throw new Exception("Failed to create category: " . $e->getMessage());
    }
  }

  public function listCategories($user_id) {
    try {
      return $this->categoryModel->getAllCategoriesByUserId($user_id);
    } catch (PDOException $e) {
      throw new Exception("Failed to get all categories by user id: " . $e->getMessage());
    }
  }

  public function getCategoryId($name, $user_id, $type) {
    try {
      return $this->categoryModel->getCategoryId($name, $user_id, $type);
    } catch (PDOException $e) {
      throw new Exception("Failed to get category id: " . $e->getMessage());
    }
  }

  public function deleteCategory($id) {
    try {
      return $this->categoryModel->deleteCategory($id);
    } catch (PDOException $e) {
      throw new Exception("Failed to delete category: " . $e->getMessage());
    }
  }
}
?>
