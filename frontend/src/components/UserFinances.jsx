import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/userFinances.css';
import TransactionList from './TransactionList';
import { Link } from 'react-router-dom';

function UserFinances({ setIsLoggedIn, transactions, setTransactions, categories, setCategories }) {

  const navigate = useNavigate();

  const [totalBalance, setTotalBalance] = useState(0);

  const handleLogout = async () => {
    const formData = new FormData();
    formData.append('action', 'logout');
    try {
      const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", formData);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  const handleAddTransaction = () => {
    navigate('/add-transaction');
  }

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/transaction.php", {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setTransactions(response.data);
      setTotalBalance(response.data.reduce((total, transaction) => {
        return total + (transaction.type === 'income' ? Number(transaction.amount) : -Number(transaction.amount));
      }, 0));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/category.php", {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const userId = sessionStorage.getItem('user_id');
  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, [userId]);

  return (
    <div id="finances-container">
      <h1>Hello, {sessionStorage.getItem('username')}!</h1>
      <p className="balance-label">Balance:</p>
      <p className="total-balance">${totalBalance.toFixed(2)}</p>
      <div className='finances-links'>
        <Link className='finances-link' to="/expenses" state={{ transactions }}>Expenses</Link>
        <Link className='finances-link' to="/income" state={{ transactions }}>Income</Link>
      </div>
      <button className="add-transaction-button" onClick={handleAddTransaction}>Add transaction</button>
      <TransactionList transactions={transactions} categories={categories} />

      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserFinances;