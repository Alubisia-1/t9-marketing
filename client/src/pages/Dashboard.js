import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WrappedPaymentForm from '../components/PaymentForm';
import '../styles/Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [investment, setInvestment] = useState('');
  const [roi, setRoi] = useState(null);
  const [contentTopic, setContentTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [keywordPhrase, setKeywordPhrase] = useState('digital marketing');
  const [competitorDomain, setCompetitorDomain] = useState('example.com');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setUser(response.data))
      .catch(() => navigate('/login'));

    // Fetch AI keywords
    fetchKeywords();
    // Fetch competitor analysis
    fetchCompetitors();
  }, [navigate]);

  const fetchKeywords = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ai/keywords`, {
        params: { phrase: keywordPhrase },
      });
      setKeywords(response.data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  const fetchCompetitors = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/ai/competitor-analysis`, {
        params: { domain: competitorDomain },
      });
      setCompetitors(response.data);
    } catch (error) {
      console.error('Error fetching competitors:', error);
    }
  };

  const generateContent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/ai/content', {
        topic: contentTopic,
      });
      setGeneratedContent(response.data.content);
    } catch (error) {
      console.error('Error generating content:', error);
      setGeneratedContent('Failed to generate content.');
    }
  };

  const calculateROI = (e) => {
    e.preventDefault();
    const calculatedROI = (investment * 2.5).toFixed(2); // Mock ROI calculation
    setRoi(calculatedROI);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <main className="dashboard">
      <div className="container">
        <h1>Welcome, {user.name}</h1>
        <div className="dashboard-content">
          <div className="metrics">
            <h3>Performance Overview</h3>
            <p>Leads Generated: 150</p>
            <p>Campaign ROI: 250%</p>
          </div>
          <div className="timeline">
            <h3>Campaign Timeline</h3>
            <p>SEO Campaign: Ongoing</p>
            <p>Content Creation: Scheduled</p>
          </div>
          <div className="insights">
            <h3>AI Keyword Insights</h3>
            <form onSubmit={(e) => { e.preventDefault(); fetchKeywords(); }}>
              <input
                type="text"
                value={keywordPhrase}
                onChange={(e) => setKeywordPhrase(e.target.value)}
                placeholder="Enter keyword phrase"
              />
              <button type="submit" className="btn-primary">Search Keywords</button>
            </form>
            <ul>
              {keywords.map((kw, index) => (
                <li key={index}>
                  {kw.keyword} (Volume: {kw.volume}, Difficulty: {kw.difficulty})
                </li>
              ))}
            </ul>
          </div>
          <div className="competitor-analysis">
            <h3>Competitor Analysis</h3>
            <form onSubmit={(e) => { e.preventDefault(); fetchCompetitors(); }}>
              <input
                type="text"
                value={competitorDomain}
                onChange={(e) => setCompetitorDomain(e.target.value)}
                placeholder="Enter competitor domain"
              />
              <button type="submit" className="btn-primary">Analyze Competitors</button>
            </form>
            <ul>
              {competitors.map((comp, index) => (
                <li key={index}>
                  {comp.competitor}: Strength - {comp.strength}, Weakness - {comp.weakness}
                </li>
              ))}
            </ul>
          </div>
          <div className="content-generation">
            <h3>Content Generation</h3>
            <form onSubmit={generateContent}>
              <input
                type="text"
                value={contentTopic}
                onChange={(e) => setContentTopic(e.target.value)}
                placeholder="Enter content topic"
                required
              />
              <button type="submit" className="btn-primary">Generate Content</button>
            </form>
            {generatedContent && <p>{generatedContent}</p>}
          </div>
          <div className="roi-calculator">
            <h3>ROI Calculator</h3>
            <form onSubmit={calculateROI}>
              <input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="Enter investment amount ($)"
                required
              />
              <button type="submit" className="btn-primary">Calculate</button>
            </form>
            {roi && <p>Estimated Return: ${roi}</p>}
          </div>
          <div className="communication">
            <h3>Communication Hub</h3>
            <p>Connect with our team for support (coming soon).</p>
          </div>
          <div className="resources">
            <h3>Resource Library</h3>
            <p>Access guides and best practices (coming soon).</p>
          </div>
          <div className="payment">
            <h3>Payments</h3>
            <WrappedPaymentForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;