import { Link } from 'react-router-dom';
import '../styles/WhiteLabel.css';

function WhiteLabel() {
  return (
    <main className="white-label">
      <div className="container">
        <h1>White-Label Portal</h1>
        <p>Custom solutions for agency partners.</p>
        <div className="portal-features">
          <h3>Features</h3>
          <p>White-label dashboard, API access, and dedicated support.</p>
          <Link to="/contact" className="btn-primary">Get Started</Link>
        </div>
      </div>
    </main>
  );
}

export default WhiteLabel;