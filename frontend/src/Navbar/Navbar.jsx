import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">RedDrop</div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>

        <Link to='/bloodbank' className="nav-link">BloodBank</Link>
        
        <Link to="/statistics" className="nav-link">Statistics</Link>
      

        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
};
