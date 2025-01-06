import axios from 'axios';
import '../styles/login.css';  

function Login() {
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    try {
      const response = await axios.post("http://localhost:80/dynamic-web-solutions/finance-manager/backend/routes/user.php", 
        {
          action: 'login',
          username,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data.success) {
        alert(response.data.message);
        e.target.reset();
      } else {
        alert(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data?.error || `Login failed: ${error.response.status}`);
      } else if (error.request) {
        alert("Network error - please try again");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
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