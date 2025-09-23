import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>AI-Powered Marketing That Delivers Results</h1>
          <p>Transform your brand with our intelligent marketing solutions.</p>
          <Link to="/contact" className="btn-1">Get Free Strategy Consultation</Link>
          <div className="trust-indicators">
            <p>Trusted by: <img src="/logos/openai.png" alt="OpenAI" /> <img src="/logos/analytics.png" alt="Google Analytics" /></p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="service-grid">
            <div className="service-card">
              <h3>T9 SEO Intelligence</h3>
              <p>AI-powered keyword research and optimization.</p>
              <Link to="/services">Learn More</Link>
            </div>
            <div className="service-card">
              <h3>T9 Content Engine</h3>
              <p>SEO-optimized content at scale.</p>
              <Link to="/services">Learn More</Link>
            </div>
            <div className="service-card">
              <h3>T9 Link Intelligence</h3>
              <p>Automated link opportunity discovery.</p>
              <Link to="/services">Learn More</Link>
            </div>
            <div className="service-card">
              <h3>T9 Digital PR Hub</h3>
              <p>Media relationship management.</p>
              <Link to="/services">Learn More</Link>
            </div>
            <div className="service-card">
              <h3>T9 Talent Marketplace</h3>
              <p>AI-powered talent matching.</p>
              <Link to="/services">Learn More</Link>
            </div>
            <div className="service-card">
              <h3>T9 Agency Portal</h3>
              <p>White-label solutions for agencies.</p>
              <Link to="/services">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <p>"T9 Marketing increased our leads by 200% in 3 months!"</p>
              <p>- John Doe, CEO</p>
            </div>
            <div className="testimonial">
              <p>"Their AI tools are a game-changer for our campaigns."</p>
              <p>- Jane Smith, Marketing Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Technology Showcase */}
      <section className="ai-showcase">
        <div className="container">
          <div className="ai-1">
            <h2>Our AI Technology</h2>
            <p>See how our AI analyzes and optimizes in real-time.</p>
          </div>
          <div className="ai-2">
            <Link to="/ai-technology" className="btn-1">See Our AI in Action</Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="contact-cta">
        <div className="container">
          <h2>Ready to Grow Your Brand?</h2>
          <Link to="/contact" className="btn-primary">Book a Free Consultation</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;