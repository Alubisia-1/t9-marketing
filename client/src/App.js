import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Home from './pages/Home';
import Services from './pages/Services';
import AITechnology from './pages/AITechnology';
import CaseStudies from './pages/CaseStudies';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register'; // Add this import
import WhiteLabel from './pages/WhiteLabel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

function GAListener() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null; // nothing to render, just listens
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ai-technology" element={<AITechnology />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Add this route */}
        <Route path="/white-label" element={<WhiteLabel />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <GAListener />
      <App />
    </Router>
  );
}