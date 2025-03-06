import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cuisine from './Components/Cuisine/cuisine';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
         {/* Navbar is rendered here */}
        <Routes>
          <Route path="/" element={<Home handleSearch={handleSearch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/cuisine" element={<Cuisine />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;