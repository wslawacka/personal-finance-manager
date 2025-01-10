import axios from 'axios';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/register.css';

function Register() {

  // initialize error message state
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    // prevent the default form submission behavior to avoid page reload
    e.preventDefault();
  
    // create a form data object to send the register data to the server
    const formData = new FormData();
    formData.append('action', 'register');
    formData.append('username', e.target.username.value.trim());
    formData.append('email', e.target.email.value.trim());
    formData.append('password', e.target.password.value.trim());
    formData.append('confirmPassword', e.target.confirmPassword.value.trim());
  
    try {
      // send the POST request to the server
      const response = await axios.post(
        "http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php",
        formData
      );
  
      // reset the form
      e.target.reset();
  
      // check if the registration was successful
      if (response.data.success) {
        // set the error message to the success message
        setErrorMessage("Registration successful!");
      } else {
        // set the error message to the error message from the server
        setErrorMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      // set the error message to the error message from the server
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  

  return (
    <div id="register-container">
      {/* display the login link */}
      <p>Already have an account? <Link className="link" to="/login">Log in</Link></p>
      {/* display the register form */}
      <form id="register-form" onSubmit={handleRegister}>
        <h1>Sign up</h1>
        <input type="text" placeholder="Username" name="username" />
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <input type="password" placeholder="Confirm Password" name="confirmPassword" />
        <button type="submit">Sign up</button>
        {/* display the error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Register;