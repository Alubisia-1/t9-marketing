import { Link } from 'react-router-dom';
import '../styles/Pricing.css';

function Pricing() {
  return (
    <main className="pricing">
      <div className="container">
        <h1>Pricing Plans</h1>
        <p>Flexible plans tailored to your business needs with clear ROI.</p>
        <div className="pricing-plans">
          <div className="plan">
            <h3>Starter</h3>
            <p>Ideal for small businesses starting their digital journey.</p>
            <p className="price">Contact for Pricing</p>
            <ul>
              <li>T9 SEO Intelligence</li>
              <li>Basic Content Engine</li>
              <li>Real-Time Analytics</li>
            </ul>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
          <div className="plan">
            <h3>Pro</h3>
            <p>Perfect for growing companies scaling their marketing.</p>
            <p className="price">Contact for Pricing</p>
            <ul>
              <li>All Starter Features</li>
              <li>T9 Link Intelligence</li>
              <li>Digital PR Hub</li>
            </ul>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
          <div className="plan">
            <h3>Enterprise</h3>
            <p>Custom solutions for large brands and agencies.</p>
            <p className="price">Contact for Pricing</p>
            <ul>
              <li>All Pro Features</li>
              <li>T9 Agency Portal</li>
              <li>Dedicated Support</li>
            </ul>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
        </div>
        <div className="cta-section">
          <h2>Find the Perfect Plan</h2>
          <Link to="/contact" className="btn-primary">Book a Free Consultation</Link>
        </div>
      </div>
    </main>
  );
}

export default Pricing;