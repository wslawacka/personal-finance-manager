import axios from 'axios';

import { useEffect } from 'react';

import { Link } from 'react-router-dom';

import '../styles/manageCategories.css';

function ManageCategories({ categories, setCategories}) {

  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/category.php", {
      params: {
        action: 'list',
      },
    });
    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  });

  // const handleEditCategory = (category) => {
    
  // }

  const handleDeleteCategory = async (categoryId) => {
    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("id", categoryId);
    formData.append("cascade", "false");
  
    try {
      const response = await axios.post(
        "http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/category.php",
        formData
      );
      
      if ( response.data.success === false &&  response.data.message.includes("linked transactions")) {
        const confirmCascade = window.confirm(
          `${response.data.message} (${response.data.transaction_count} transactions). Do you want to delete them?`
        );
        if (confirmCascade) {
          const cascadeFormData = new FormData();
          cascadeFormData.append("action", "delete");
          cascadeFormData.append("id", categoryId);
          cascadeFormData.append("cascade", "true");
  
          const cascadeResponse = await axios.post(
            "http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/category.php",
            cascadeFormData
          );

          if (cascadeResponse.data.success) {
            fetchCategories(); // Refresh categories
          }
        }
      } 
    } catch (error) {
        console.error("Error deleting category:", error);
        alert("Error deleting category");
      }   
  };
  

  return (
    <div className="manage-categories-container">
      <Link className="back-link" to="/finances">Back to transactions</Link>
      <ul className="categories-list">
        {categories.map((category) => (
          <li key={category.id}>
            <div className="category-info-container">
              <span className="category-name">{category.name}</span><span className={`category-type ${category.type}`}>{category.type}</span>
            </div>
            <div className="category-buttons-container">
              <button className="edit-category-button">Edit</button>
              <button className="delete-category-button" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCategories;
