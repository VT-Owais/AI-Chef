import React, { useState, useEffect } from 'react';
import './cuisine.css';
import RecipeInfo from '../Home/RecipeInfo'; // Import the RecipeInfo component

const FamousMeals = () => {
  const [famousRecipes, setFamousRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track selected recipe

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

  // Fetch famous recipes from API Ninjas
  const fetchFamousRecipes = async () => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/recipe?query=Omelette & Fried Chicken & Ice Cream', {
        headers: {
          'X-Api-Key': 'yfwr5VqoyZmcOCJRNC0l3Q==BI5paE4i7T3Nload', // Replace with your API Ninjas key
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Famous recipes:', data);
      return data;
    } catch (error) {
      console.error('Error fetching famous recipes:', error);
      return []; // Return empty array on error
    }
  };

  // Fetch famous recipes and images
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch famous recipes
        const recipes = await fetchFamousRecipes();

        // Fetch images for famous recipes
        const images = await fetchImages('Omelette & Fried Chicken & Ice Cream');

        // Combine recipes with images
        const recipesWithImages = recipes.slice(0, 5).map((recipe, index) => ({
          ...recipe,
          image: images[index % images.length]?.src.medium || 'https://via.placeholder.com/300x150', // Use a placeholder if no image is available
        }));

        setFamousRecipes(recipesWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle "View Recipe" button click
  const handleViewRecipe = (recipe) => {
    console.log('View Recipe Clicked:', recipe); // Log the clicked recipe
    setSelectedRecipe(recipe);
  };

  // Close the RecipeInfo modal
  const handleCloseRecipeInfo = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="famous-meals-section">
      <h2>FAMOUS MEALS</h2>
      <p>Bring the restaurant home! Explore our Meal Kits and cook like a pro in your own kitchen.</p>

      <div className="famous-meals-container">
        {famousRecipes.map((recipe, index) => (
          <div className="famous-meal-card" key={index}>
            <div className="meal-image">
              <img src={recipe.image} alt={recipe.title} />
            </div>
            <h3 className="meal-title">{recipe.title}</h3>
            <button className="meal-button" onClick={() => handleViewRecipe(recipe)}>
              VIEW RECIPE
            </button>
          </div>
        ))}
      </div>

      {/* Render RecipeInfo modal if a recipe is selected */}
      {selectedRecipe && (
        <RecipeInfo recipe={selectedRecipe} onClose={handleCloseRecipeInfo} />
      )}
    </div>
  );
};

export default FamousMeals;