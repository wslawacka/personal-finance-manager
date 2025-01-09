import axios from 'axios';
import '../styles/login.css';  
import { Link } from 'react-router-dom';
import UserFinances from '../components/UserFinances';
import { useState } from 'react';

function Login() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {

    // Prevent the default form submission behavior to avoid page reload
    e.preventDefault();

    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('username', e.target.username.value.trim());
    formData.append('password', e.target.password.value.trim());

    try {
      // Send the request to the server
      const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", formData);
      
      console.log(response.data);

      e.target.reset();

      if (response.data.success) {
        setIsLoggedIn(true);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid username or password. Please try again.");
  }
}

  return (
    <>
      {isLoggedIn ? <UserFinances setIsLoggedIn={setIsLoggedIn} /> : (
        <div id="login-container">
          <p>Don't have an account? <Link className="link" to="/register">Register</Link></p>
      <form id="login-form" onSubmit={handleLogin}>
        <h1>Log in</h1>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Login;