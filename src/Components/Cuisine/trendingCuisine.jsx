import React, { useState, useEffect, useRef } from 'react';
import './cuisine.css';
import RecipeCard from '../Home/RecipeCard'; // Import the RecipeCard component
import RecipeInfo from '../Home/RecipeInfo'; 

const TrendingCuisine = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); 
  const containerRef = useRef(null);
  const boxWidth = 320; 

  // Fetch images from Pexels API
  const fetchImages = async (query) => {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`, {
        headers: {
          Authorization: 'FPuVufrCgR2u9v0vWKtIKH6hmsVgIyEKeDeaI3XnQ7vDSMnwxexIuww5', // Pexels API key
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

  // Fetch recipes from API Ninjas
  const fetchRecipes = async (query) => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(query)}`, {
        headers: {
          'X-Api-Key': 'yfwr5VqoyZmcOCJRNC0l3Q==BI5paE4i7T3Nload', // API Ninjas key
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching recipes for ${query}:`, error);
      return [];
    }
  };

  // Fetch trending recipes and images
  useEffect(() => {
    const fetchTrendingRecipesAndImages = async () => {
      try {
        // Define the keywords for recipes you want to fetch
        const keywords = ['Shawarma', 'Lebanese', 'Indian', 'Cheese', 'Curry'];

        // Fetch recipes for each keyword
        const recipesPromises = keywords.map((keyword) => fetchRecipes(keyword));
        const recipesResults = await Promise.all(recipesPromises);

        // Combine all recipes into a single array
        const allRecipes = recipesResults.flat();

        // Fetch images for the recipes 
        const images = await fetchImages('Shawarma Lebanese Indian Cheese Curry');

        // Combine recipes with images
        const recipesWithImages = allRecipes.map((recipe, index) => ({
          ...recipe,
          image: images[index % images.length]?.src.medium || 'https://via.placeholder.com/300x150',
        }));

        // Limit to 7 recipes for the carousel
        setTrendingRecipes(recipesWithImages.slice(0, 7));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingRecipesAndImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (scrollPosition >= maxScroll) {
          setScrollPosition(0);
        } else {
          setScrollPosition(scrollPosition + boxWidth);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [scrollPosition]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [scrollPosition]);

  const scrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - boxWidth);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (scrollPosition < maxScroll) {
        setScrollPosition(scrollPosition + boxWidth);
      }
    }
  };

  const handleViewRecipe = (recipe) => {
    console.log('View Recipe Clicked:', recipe);
    setSelectedRecipe(recipe);
  };

  // Close the RecipeInfo modal
  const handleCloseRecipeInfo = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container-cuisine-section">
      <h2 className="center-head">TRENDING RECIPES</h2>
      <div className="header-subtitle">
        <p>Take home the Kitchen Comforts experience. Try our Meal Kits and unleash your inner chef!</p>
      </div>

      <div className="trending-container-wrapper">
        <button className="nav-arrow nav-arrow-left" onClick={scrollLeft}>&#10094;</button>

        <div className="trending-recipes-container" ref={containerRef}>
          {trendingRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onViewRecipe={() => handleViewRecipe(recipe)} 
            />
          ))}
        </div>

        <button className="nav-arrow nav-arrow-right" onClick={scrollRight}>&#10095;</button>
      </div>

      {selectedRecipe && (
        <RecipeInfo recipe={selectedRecipe} onClose={handleCloseRecipeInfo} />
      )}
    </div>
  );
};

export default TrendingCuisine;