import axios from 'axios';
axios.defaults.withCredentials = true;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/addTransaction.css';

function AddTransaction({categories}) {

  const navigate = useNavigate();

  // initialize type state for the transaction type (income or expense)
  const [type, setType] = useState('income');

  // handle the type change
  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleTransactionSubmit = () => {
    // get the user id from the session storage
    const user_id = sessionStorage.getItem('user_id');
    // get the amount from the amount input
    const amount = document.querySelector('input[name="amount"]').value;
    // get the date from the date input
    const date = document.querySelector('input[name="date"]').value;
    // get the description from the description input
    const description = document.querySelector('input[name="description"]').value;
    // get the category id from the category input
    const category_id = document.querySelector('select[name="category"]').value;

    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('user_id', user_id);
    formData.append('category_id', category_id);
    formData.append('type', type);
    formData.append('amount', amount);
    formData.append('date', date);
    formData.append('description', description);
    // send the request to the server to add the transaction
    axios.post('http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/transaction.php', formData);

    // navigate to the finances page
    navigate('/finances');
    
  }

  return (
    <div className="add-transaction-container">
      <h1>Add Transaction</h1>
      <form className="add-transaction-form">
        <input type="number" placeholder="Amount" min="0" name="amount"/>
        <input type="text" placeholder="Description" name="description"/>
        <input type="date" placeholder="Date" name="date"/>
        <select name="type" id="type" onChange={handleTypeChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select name="category" id="category">
        {/* if expense, display the categories for expense */}
        {/* if income, display the categories for income */}
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
        </select>
        <button className="add-transaction-button" type="submit" onClick={handleTransactionSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default AddTransaction;