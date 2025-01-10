import axios from 'axios';
// Enable cookies to be sent with the request
axios.defaults.withCredentials = true;

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import '../styles/login.css';  

function Login({ setIsLoggedIn }) {

  // initialize useNavigate hook to navigate to the user finances page after successful login
  const navigate = useNavigate();

  // initialize error message state
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {

    // prevent the default form submission behavior to avoid page reload
    e.preventDefault();

    // create a form data object to send the login data to the server
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('username', e.target.username.value.trim());
    formData.append('password', e.target.password.value.trim());

    try {
      // send the request to the server
      const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", formData);

      // get the username from the response
      const username = response.data.username;

      // store the username and user_id in the session storage
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('user_id', response.data.user_id);

      // reset the form
      e.target.reset();

      // check if the login was successful
      if (response.data.success) {
        // set the isLoggedIn state to true
        setIsLoggedIn(true);
        // navigate to the user finances page
        navigate('/finances');
      } else {
        // set the error message
        setErrorMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      // set the error message
      setErrorMessage("Invalid username or password. Please try again.");
    }
  }

  return (
    <div id="login-container">
      {/* display the register link */}
      <p>Don't have an account? <Link className="link" to="/register">Register</Link></p>
      {/* display the login form */}
      <form id="login-form" onSubmit={handleLogin}>
        <h1>Log in</h1>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  )
}

export default Login;