import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import CivilProtection from './pages/services/CivilProtection';
import Forensics from './pages/services/Forensics';
import ExplosivesAnalysis from './pages/services/ExplosivesAnalysis';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Dashboard from './pages/Dashboard';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/civil-protection" element={<CivilProtection />} />
            <Route path="/services/forensics" element={<Forensics />} />
            <Route path="/services/explosives-analysis" element={<ExplosivesAnalysis />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;