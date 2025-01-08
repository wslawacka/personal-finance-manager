import { Link } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  return (
    <div id="home-container">

      <h2>Manage your finances with ease!</h2>
      <p>Start taking control of your money today!</p>
      <p>Sign in or register to get started:</p>

      <div id="home-buttons">
        <Link to="/login"><button className="home-button">Login</button></Link>
        <Link to="/register"><button className="home-button">Register</button></Link>
      </div>

      {/* if user is logged in, show dashboard */}

      

    </div>
  );
}

export default Home;