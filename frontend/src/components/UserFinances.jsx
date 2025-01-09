import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/finances.css';
import TransactionList from './TransactionList';

function UserFinances({ setIsLoggedIn }) {
  const navigate = useNavigate();

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
// // get transactions from backend
// const getTransactions = async () => {
//   const response = await axios.get('http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/transaction.php');
//   return response.data;
// }

// // const transactions = getTransactions();



  return (
    <div id="finances-container">
      <h1>Hello, {sessionStorage.getItem('username')}!</h1>
      {/* total balance */}
      <button className="add-transaction-button" onClick={handleAddTransaction}>Add transaction</button>
      {/* <TransactionList transactions={transactions} /> */}

      <button className="logout-button" onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserFinances;