import axios from 'axios';
axios.defaults.withCredentials = true;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../styles/addTransaction.css';

function AddTransaction({categories}) {

  const navigate = useNavigate();

  // initialize type state for the transaction type (income or expense)
  const [type, setType] = useState('income');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);

  // handle the type change
  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleCategoryChange = (e) => {
    if(e.target.value === 'other') {
      setIsAddingNewCategory(true);
    } else {
      setIsAddingNewCategory(false);
    }
  }

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();

    // get the user id from the session storage
    const user_id = sessionStorage.getItem('user_id');

    // get the amount from the amount input
    const amount = document.querySelector('input[name="amount"]').value;
    // get the date from the date input
    const date = document.querySelector('input[name="date"]').value;
    // get the description from the description input
    const description = document.querySelector('input[name="description"]').value;
    // get the category id from the category input
    let category_id = document.querySelector('select[name="category"]').value || null;

    if(isAddingNewCategory && newCategory) {
      // add the new category to the database
      try {
        const formData = new FormData();
        formData.append('action', 'add');
        formData.append('user_id', user_id);
        formData.append('name', newCategory);
        formData.append('type', type);
        const response = await axios.post('http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/category.php', formData);
        category_id = response.data.id;
      } catch(error) {
        alert('Error adding new category');
      }
    }


    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('user_id', user_id);
    formData.append('category_id', category_id);
    formData.append('type', type);
    formData.append('amount', amount);
    formData.append('date', date);
    formData.append('description', description);
    
    try {
      await axios.post(
        'http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/transaction.php',
        formData,
      );
      navigate('/finances');
    } catch (error) {
      alert('Error adding transaction');
    }
  }

  return (
    <div className="add-transaction-container">
      <Link className="back-link" to="/finances">Back to transactions</Link>
      <h1>Add Transaction</h1>
      <form className="add-transaction-form">
        <input type="number" placeholder="Amount" min="0" name="amount"/>
        <input type="text" placeholder="Description (optional)" name="description"/>
        <input type="date" placeholder="Date" name="date"/>
        <select name="type" id="type" onChange={handleTypeChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="category" id="category" onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.filter(category => category.type === type).map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          <option value="other">Other (add new)</option>
        </select>
        {isAddingNewCategory && (
          <input
            type="text"
            placeholder="New Category Name"
            name="newCategory"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        )}
        <button className="add-transaction-button" type="submit" onClick={(e) => handleTransactionSubmit(e)}>Submit</button>
      </form>
    </div>
  )
}

export default AddTransaction;