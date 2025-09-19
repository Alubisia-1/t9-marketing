import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container">
        <h1><Link to="/" className="logo">T9 Marketing</Link></h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/ai-technology">AI Technology</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/white-label">White-Label Portal</Link></li>
            {token ? (
              <>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><button onClick={handleLogout} className="btn-primary">Logout</button></li>
              </>
            ) : (
              <li><Link to="/register">Register</Link></li>
            )}
          </ul>
        </nav>
        <Link to="/contact" className="btn-primary">Get Consultation</Link>
      </div>
    </header>
  );
}

export default Navbar;