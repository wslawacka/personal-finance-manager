import '../styles/register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form reload
  
    // Create form data
    const formData = new FormData();
    formData.append('action', 'register');
    formData.append('username', e.target.username.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('confirmPassword', e.target.confirmPassword.value);
  
    try {
      // Send the POST request
      const response = await axios.post(
        "http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php",
        formData
      );
  
      // Log the server response
      console.log(response.data);
  
      // Reset the form
      e.target.reset();
  
      // Handle success or failure
      if (response.data.success) {
        alert("Registration successful!");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div id="register-container">
      <p>Already have an account? <Link className="link" to="/login">Log in</Link></p>
      <form id="register-form" onSubmit={handleRegister}>
        <h1>Sign up</h1>
        <input type="text" placeholder="Username" name="username" />
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <input type="password" placeholder="Confirm Password" name="confirmPassword" />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Register;