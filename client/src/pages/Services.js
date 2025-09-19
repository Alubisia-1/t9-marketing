import { Link } from 'react-router-dom';
import '../styles/Services.css';

function Services() {
  return (
    <main className="services-page">
      <div className="container">
        <h1>Our AI-Powered Services</h1>
        <p>Unlock your brand’s potential with our intelligent marketing solutions.</p>
        <div className="services-list">
          <div className="service-item">
            <h3>T9 SEO Intelligence</h3>
            <p>Boost your rankings with AI-driven keyword research, real-time SERP monitoring, and automated technical SEO.</p>
            <p><strong>Results:</strong> Clients see up to 300% increase in organic traffic.</p>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
          <div className="service-item">
            <h3>T9 Content Engine</h3>
            <p>Create SEO-optimized blogs, social posts, and ads at scale with AI, refined by our expert team.</p>
            <p><strong>Results:</strong> 50% faster content production with 20% higher engagement.</p>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
          <div className="service-item">
            <h3>T9 Link Intelligence</h3>
            <p>Discover high-quality link opportunities with AI-powered analysis and automated outreach.</p>
            <p><strong>Results:</strong> 2x more backlinks with 30% lower risk.</p>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
          <div className="service-item">
            <h3>T9 Digital PR Hub</h3>
            <p>Manage media relationships, monitor brand mentions, and handle crisis communications.</p>
            <p><strong>Results:</strong> 100+ media mentions for top clients.</p>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
          <div className="service-item">
            <h3>T9 Talent Marketplace</h3>
            <p>Connect with vetted freelancers through our AI-powered talent matching platform.</p>
            <p><strong>Results:</strong> 80% faster project staffing.</p>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
          <div className="service-item">
            <h3>T9 Agency Portal</h3>
            <p>White-label solutions with a custom dashboard and API access for agencies.</p>
            <p><strong>Results:</strong> 40% increase in agency client retention.</p>
            <Link to="/contact" className="btn-primary">Get Started</Link>
          </div>
        </div>
        <div className="cta-section">
          <h2>Ready to Transform Your Marketing?</h2>
          <Link to="/contact" className="btn-primary">Book a Free Consultation</Link>
        </div>
      </div>
    </main>
  );
}

export default Services;