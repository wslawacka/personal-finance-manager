import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/addTransaction.css';

function AddTransaction() {

  // get the categories from the location state
  const { categories } = useLocation().state;

  // initialize type state for the transaction type (income or expense)
  const [type, setType] = useState('income');

  // handle the type change
  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  return (
    <div className="add-transaction-container">
      <h1>Add Transaction</h1>
      <form className="add-transaction-form">
        <input type="number" placeholder="Amount" min="0" />
        <input type="text" placeholder="Description" />
        <input type="date" placeholder="Date" />
        <select name="type" id="type" onChange={handleTypeChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {/* if expense, display the categories */}
        <select name="category" id="category" style={{display: type === 'expense' ? 'block' : 'none'}}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button className="add-transaction-button" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddTransaction;