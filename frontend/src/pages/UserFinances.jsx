import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import TransactionList from '../components/TransactionList';

import '../styles/userFinances.css';


function UserFinances({ setIsLoggedIn, transactions, setTransactions, categories, setCategories }) {

  // initialize useNavigate hook to navigate to the login page after logging out
  const navigate = useNavigate();

  // initialize total balance state
  const [totalBalance, setTotalBalance] = useState(0);

  // initialize error message state
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = async () => {
    // create a form data object to send the logout data to the server
    const formData = new FormData();
    formData.append('action', 'logout');
    try {
      // send the request to the server
      await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", formData);
      // set the isLoggedIn state to false
      setIsLoggedIn(false);
      // delete the session storage
      sessionStorage.clear();
      // navigate to the login page
      navigate('/login');
    } catch (error) {
      // set the error message to the error message from the server
      setErrorMessage(error.response.data.message);
    }
  }

  const handleAddTransaction = () => {
    navigate('/add-transaction');
  }

  const fetchTransactions = async () => {
    try {
      // send the request to the server to get the transactions
      const response = await axios.get("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/transaction.php", 
        {
          params: {
            action: 'get',
          },
          withCredentials: true, // ensure cookies are sent with the request
        });
      // set the transactions state to the transactions from the server
      setTransactions(response.data);
      // set the total balance state to the calculated balance from the transactions
      setTotalBalance(response.data.reduce((total, transaction) => {
        return total + (transaction.type === 'income' ? Number(transaction.amount) : -Number(transaction.amount));
      }, 0));
    } catch (error) {
      // set the error message to the error message from the server
      setErrorMessage(error.response.data.message);
    }
  };

  const fetchCategories = async () => {
    try {
      // send the request to the server to get the categories
      const response = await axios.get("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/category.php", {
        params: {
          action: 'list',
        },
        withCredentials: true, // ensure cookies are sent with the request
      });
      // set the categories state to the categories from the server
      setCategories(response.data);
    } catch (error) {
      // set the error message to the error message from the server
      setErrorMessage(error.response.data.message);
    }
  };

  // get the user id from the session storage
  const userId = sessionStorage.getItem('user_id');

  // use useEffect to fetch the transactions and categories when the user id changes
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [userId]);

  return (
    <div id="finances-container">
      {/* display the welcome message */}
      <h1>Hello, {sessionStorage.getItem('username')}!</h1>
      {/* display the balance */}
      <p className="balance-label">Balance:</p>
      <p className="total-balance">{totalBalance.toFixed(2)} &#8364;</p>
      {/* display the links to the expenses and income pages */}
      <div className='finances-links'>
        <Link className='finances-link' to="/expenses">Expenses</Link>
        <Link className='finances-link' to="/income">Income</Link>
      </div>
      {/* display the add transaction button */}
      <div className="buttons-container">
        <button className="add-transaction-button" onClick={handleAddTransaction}>Add transaction</button>
        <button className="manage-categories-button" onClick={() => navigate('/manage-categories')}>Manage categories</button>
      </div>
      {/* display the list of transactions */}
      <TransactionList transactions={transactions} categories={categories} fetchTransactions={fetchTransactions} fetchCategories={fetchCategories} />
      {/* display the logout button */}
      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserFinances;