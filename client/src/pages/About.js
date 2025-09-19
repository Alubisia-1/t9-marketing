import { Link } from 'react-router-dom';
import '../styles/About.css';

function About() {
  return (
    <main className="about">
      <div className="container">
        <h1>About T9 Marketing</h1>
        <p>Empowering brands with AI-driven marketing solutions since 2025.</p>
        <div className="about-content">
          <h3>Our Mission</h3>
          <p>We combine cutting-edge AI with expert human oversight to deliver measurable results and transparent ROI.</p>
          <h3>Our Team</h3>
          <p>Our team of AI specialists and marketing experts is dedicated to your success, with over 50 years of combined experience.</p>
          <h3>Our Values</h3>
          <ul>
            <li>Innovation: Leveraging AI to stay ahead.</li>
            <li>Transparency: Clear metrics and reporting.</li>
            <li>Results: Driving measurable growth.</li>
          </ul>
          <Link to="/contact" className="btn-primary">Contact Our Team</Link>
        </div>
      </div>
    </main>
  );
}

export default About;