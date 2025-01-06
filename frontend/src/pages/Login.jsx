import axios from 'axios';
import '../styles/login.css';  

function Login() {
  const handleLogin = async (e) => {

    // Prevent the default form submission behavior to avoid page reload
    e.preventDefault();

    // Create the request data
    const requestData = JSON.stringify({
      action: 'login',
      username: e.target.username.value,
      password: e.target.password.value,
    });

    try {
      // Send the request to the server
      const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", requestData);
      
      // Parse the response data if it's a string
      const userData = typeof response.data === 'string' 
        ? JSON.parse(response.data.split('<br>')[1]) // Take the part after <br>
        : response.data.user || response.data; // If it's already JSON, get user data

      // Check if login was successful by looking for user_id in response
      if (userData.id) {
        alert('Login successful!');
      } else {
        alert('Login failed: Invalid credentials');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }

    // Reset the form
    e.target.reset();
  }

  return (
    <div id="login-container">
      <form id="login-form" onSubmit={handleLogin}>
        <h1>Log in</h1>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;