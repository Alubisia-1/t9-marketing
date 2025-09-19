import { Link } from 'react-router-dom';
import '../styles/Blog.css';

function Blog() {
  return (
    <main className="blog">
      <div className="container">
        <h1>Resource Hub</h1>
        <p>Stay informed with the latest AI marketing trends and insights.</p>
        <div className="blog-posts">
          <div className="blog-post">
            <h3>AI Marketing Trends for 2025</h3>
            <p>Explore how AI is transforming digital marketing strategies.</p>
            <p><strong>Key Insight:</strong> AI-driven personalization boosts conversion rates by 30%.</p>
            <Link to="/contact" className="btn-primary">Read More</Link>
          </div>
          <div className="blog-post">
            <h3>How to Leverage AI for SEO</h3>
            <p>Practical tips to optimize your SEO with AI tools.</p>
            <p><strong>Key Insight:</strong> Real-time SERP monitoring improves rankings by 25%.</p>
            <Link to="/contact" className="btn-primary">Read More</Link>
          </div>
          <div className="blog-post">
            <h3>Scaling Content with AI</h3>
            <p>Learn how to produce high-quality content at scale.</p>
            <p><strong>Key Insight:</strong> AI content tools reduce production time by 50%.</p>
            <Link to="/contact" className="btn-primary">Read More</Link>
          </div>
        </div>
        <div className="cta-section">
          <h2>Want More Insights?</h2>
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </div>
    </main>
  );
}

export default Blog;