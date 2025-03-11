import React, { useState, useRef, useEffect } from 'react';
import './cuisine.css';
import RecipeInfo from '../Home/recipeInfo'; // Import the RecipeInfo component

const ItalianCuisine = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const containerRef = useRef(null);
  const boxWidth = 370; // Width of each box including gap

  // Fetch images from Pexels API
  const fetchImages = async (query) => {
    try {
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15`, {
        headers: {
          Authorization: 'FPuVufrCgR2u9v0vWKtIKH6hmsVgIyEKeDeaI3XnQ7vDSMnwxexIuww5', // Replace with your Pexels API key
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
      return []; // Return empty array on error to prevent breaking the app
    }
  };

  // Fetch Italian cuisine data and images
  useEffect(() => {
    const fetchItalianRecipesAndImages = async () => {
      try {
        // Fetch recipes
        const recipesResponse = await fetch('https://api.api-ninjas.com/v1/recipe?query=Italian', {
          headers: {
            'X-Api-Key': 'yfwr5VqoyZmcOCJRNC0l3Q==BI5paE4i7T3Nload',
          },
        });

        if (!recipesResponse.ok) {
          throw new Error(`HTTP error! Status: ${recipesResponse.status}`);
        }

        const recipesData = await recipesResponse.json();

        // Fetch images for Italian food
        const images = await fetchImages('Italian food');

        // Combine recipes with images
        const recipesWithImages = recipesData.map((recipe, index) => ({
          ...recipe,
          image: images[index % images.length]?.src.medium || 'https://via.placeholder.com/300x150', // Use a placeholder if no image is available
        }));

        setRecipes(recipesWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchItalianRecipesAndImages();
  }, []);

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - boxWidth, 0));
  };

  const scrollRight = () => {
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    setScrollPosition((prev) => Math.min(prev + boxWidth, maxScroll));
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeInfo = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="italian-cuisine-section">
      <h2>ITALIAN CUISINE</h2>
      <p>From our kitchen to yours—discover the joy of cooking with our delicious Meal Kits!</p>
      <div className="carousel-container">
        <button className="carousel-arrow recipe-button left" onClick={scrollLeft}>&lt;</button>
        <div className="carousel" ref={containerRef} style={{ transform: `translateX(-${scrollPosition}px)` }}>
          {recipes.map((recipe, index) => (
            <div className="cuisine-box" key={index}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <button onClick={() => handleViewRecipe(recipe)}>VIEW RECIPE</button>
            </div>
          ))}
        </div>
        <button className="carousel-arrow right recipe-button" onClick={scrollRight}>&gt;</button>
      </div>

      {/* Render the RecipeInfo component if a recipe is selected */}
      {selectedRecipe && (
        <RecipeInfo recipe={selectedRecipe} onClose={handleCloseRecipeInfo} />
      )}
    </div>
  );
};

export default ItalianCuisine;