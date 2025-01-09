import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div>
      <h1>User Finances</h1>
      <p>Placeholder for user finances</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default UserFinances;