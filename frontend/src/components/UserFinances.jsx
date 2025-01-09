import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/finances.css';
import TransactionList from './TransactionList';

function UserFinances({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleLogout = async () => {
    
    const formData = new FormData();
    formData.append('action', 'logout');

    try {
      const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error logging out:', error);
    }

    setIsLoggedIn(false);
    navigate('/login');
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
      console.log("categories", categories);
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
      {/* total balance */}
      <button className="add-transaction-button" onClick={handleAddTransaction}>Add transaction</button>
      <TransactionList transactions={transactions} categories={categories} />

      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserFinances;