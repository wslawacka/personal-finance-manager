import '../styles/register.css';
import axios from 'axios';

function Register() {

  const handleRegister = async (e) => {

    // Prevent the default form submission behavior to avoid page reload
    e.preventDefault();
    
    // Create the request data
    const requestData = JSON.stringify({
      action: 'register',
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    });

    // Send the request to the server
    const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", requestData);

    // Reset the form
    e.target.reset();
  }

  return (
    <div id="register-container">
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