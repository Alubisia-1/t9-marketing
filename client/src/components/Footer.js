import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h3>T9 Marketing</h3>
            <p>AI-Powered Marketing That Delivers Results</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/ai-technology">AI Technology</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>Email: info@t9marketing.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <p className="footer-bottom">© 2025 T9 Marketing. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;