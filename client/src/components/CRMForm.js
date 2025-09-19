import { useState } from 'react';
import axios from 'axios';
import '../styles/CRMForm.css';

function CRMForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your HubSpot Form API endpoint
      await axios.post('YOUR_HUBSPOT_FORM_API_URL', { fields: [{ name: 'email', value: email }] });
      setStatus('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      setStatus('Error subscribing. Please try again.');
    }
  };

  return (
    <div className="crm-form">
      <h3>Subscribe to Updates</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="btn-primary">Subscribe</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default CRMForm;