import { Link } from 'react-router-dom';
import '../styles/CaseStudies.css';

function CaseStudies() {
  return (
    <main className="case-studies">
      <div className="container">
        <h1>Case Studies</h1>
        <p>Discover how we’ve driven success for our clients.</p>
        <div className="case-study-list">
          <div className="case-study">
            <h3>Client A: E-Commerce Growth</h3>
            <p>300% increase in organic traffic in 6 months using T9 SEO Intelligence.</p>
            <p><strong>Strategy:</strong> AI-driven keyword optimization and content strategy.</p>
            <Link to="/contact" className="btn-primary">Learn More</Link>
          </div>
          <div className="case-study">
            <h3>Client B: SaaS Lead Generation</h3>
            <p>200% boost in qualified leads with T9 Content Engine and Link Intelligence.</p>
            <p><strong>Strategy:</strong> Targeted content and backlink campaigns.</p>
            <Link to="/contact" className="btn-primary">Learn More</Link>
          </div>
          <div className="case-study">
            <h3>Client C: Agency Partnership</h3>
            <p>40% increase in client retention with T9 Agency Portal.</p>
            <p><strong>Strategy:</strong> White-label solutions and custom dashboards.</p>
            <Link to="/contact" className="btn-primary">Learn More</Link>
          </div>
        </div>
        <div className="cta-section">
          <h2>Ready for Your Success Story?</h2>
          <Link to="/contact" className="btn-primary">Get Started</Link>
        </div>
      </div>
    </main>
  );
}

export default CaseStudies;