import '../styles/login.css';  

function Login() {
  return (
    <div id="login-container">
      <form id="login-form">
        <h1>Log in</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;