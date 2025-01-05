import '../styles/register.css';

function Register() {
  return (
    <div id="register-container">
      <form id="register-form">
        <h1>Sign up</h1>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Register;