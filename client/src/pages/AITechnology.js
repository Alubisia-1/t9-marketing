import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/AITechnology.css';

function AITechnology() {
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [status, setStatus] = useState('');

  const handleGenerateContent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/ai/content', { topic });
      setGeneratedContent(response.data.content);
      setStatus('Content generated successfully!');
    } catch (error) {
      setStatus('Error generating content.');
    }
  };

  return (
    <main className="ai-technology">
      <div className="container">
        <h1>Our AI Technology</h1>
        <p>Harness the power of AI to drive measurable marketing results.</p>
        <div className="ai-features">
          <div className="ai-feature">
            <h3>Keyword Optimization</h3>
            <p>Real-time keyword research and SERP tracking for top rankings.</p>
            <p><strong>Benefit:</strong> 50% faster keyword optimization.</p>
          </div>
          <div className="ai-feature">
            <h3>Content Generation</h3>
            <p>AI-crafted content with human oversight for quality and SEO.</p>
            <p><strong>Benefit:</strong> 30% higher engagement rates.</p>
          </div>
          <div className="ai-feature">
            <h3>Link Building</h3>
            <p>Automated identification of high-quality link opportunities.</p>
            <p><strong>Benefit:</strong> 2x more backlinks in half the time.</p>
          </div>
          <div className="ai-feature">
            <h3>Competitor Analysis</h3>
            <p>Monitor competitors’ strategies with AI-driven insights.</p>
            <p><strong>Benefit:</strong> Stay ahead with real-time data.</p>
          </div>
        </div>
        <div className="demo-section">
          <h2>Try Our AI Content Generation</h2>
          <form onSubmit={handleGenerateContent}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic (e.g., SEO strategies)"
              required
            />
            <button type="submit" className="btn-primary">Generate Content</button>
          </form>
          {status && <p>{status}</p>}
          {generatedContent && (
            <div className="generated-content">
              <h3>Generated Content</h3>
              <p>{generatedContent}</p>
            </div>
          )}
          <Link to="/contact" className="btn-primary">Request Full Demo</Link>
        </div>
      </div>
    </main>
  );
}

export default AITechnology;