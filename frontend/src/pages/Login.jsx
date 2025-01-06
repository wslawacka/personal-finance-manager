import axios from 'axios';
import '../styles/login.css';  

function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();

    const requestData = JSON.stringify({
      action: 'login',
      username: e.target.username.value,
      password: e.target.password.value,
    });

    const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", requestData);
    
    // Try to parse the user data from the response
    try {
      const userData = typeof response.data === 'string' 
        ? JSON.parse(response.data.split('<br>')[1]) // Split by <br> and take the JSON part
        : response.data;

      if (userData.id) {
        alert('Login successful!');
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        alert('Login failed: Invalid credentials');
      }
    } catch (error) {
      alert('Login failed: ' + response.data);
    }

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