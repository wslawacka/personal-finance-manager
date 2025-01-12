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
  }, []);

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
              <button className="delete-category-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCategories;
