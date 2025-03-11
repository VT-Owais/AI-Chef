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
  const [recipes, setRecipes] = useState([]); 

  // Fetch recipes from API Ninjas
  const fetchRecipes = async (query) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(query)}`, {
        headers: {
          'X-Api-Key': 'yfwr5VqoyZmcOCJRNC0l3Q==BI5paE4i7T3Nload',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Recipe API Error:', errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Recipe data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  };

  // Fetch images from Pexels API
  const fetchImages = async (query) => {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`, {
        headers: {
          'Authorization': 'FPuVufrCgR2u9v0vWKtIKH6hmsVgIyEKeDeaI3XnQ7vDSMnwxexIuww5', 
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Pexels API Error:', errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Pexels data:', data);
      return data.photos;
    } catch (error) {
      console.error('Error fetching images:', error);
      return []; 
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      alert('Please enter a search term.');
      return;
    }
    
    try {
      const [recipesData, imagesData] = await Promise.all([
        fetchRecipes(searchQuery),
        fetchImages(searchQuery + ' food')
      ]);
      
      const recipesWithImages = recipesData.map((recipe, index) => {
        const image = imagesData.length > 0 ? imagesData[index % imagesData.length] : null;
        
        return {
          ...recipe,
          image: image ? image.src.medium : null,
          photographer: image ? image.photographer : null,
          photographerUrl: image ? image.photographer_url : null
        };
      });
      
      setRecipes(recipesWithImages);
    } catch (error) {
      alert('Error fetching data: ' + error.message);
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleSearch={handleSearch}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                recipes={recipes}
              />
            }
          />
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