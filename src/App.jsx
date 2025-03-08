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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert('Please enter a search term.');
      return;
    }
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'X-Api-Key': 'yfwr5VqoyZmcOCJRNC0l3Q==BI5paE4i7T3Nload', 
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert(error.message); 
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
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