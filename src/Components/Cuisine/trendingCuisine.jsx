import React, { useState, useEffect, useRef } from 'react';
import './cuisine.css';
import RecipeCard from '../Home/RecipeCard'; // Correct import path
import RecipeInfo from '../Home/RecipeInfo'; // Correct import path

const TrendingCuisine = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track selected recipe
  const containerRef = useRef(null);
  const boxWidth = 320; // Width of each box including gap

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

  // Fetch trending recipes and images
  useEffect(() => {
    const fetchTrendingRecipesAndImages = async () => {
      const hardcodedRecipes = [
        {
          title: "Chris' Popular Chocolate Mousse",
          ingredients: "350 mg Package Semi-Sweet Choco|Chips|1 pk Chocola…ream|1/4 c Margerine/butter|SpringForm Pan|Fridge",
          servings: "1 Servings",
          instructions: "THE CRUST Crush the wafers, preserving a few for g…ut 6 hours, though it might be ready before that.",
        },
        {
          title: "Pancakes",
          ingredients: "flour, milk, eggs...",
          instructions: "Mix ingredients and cook on a hot pan...",
        },
        {
          title: "Rock Cakes",
          ingredients: "flour, sugar, butter...",
          instructions: "Mix ingredients and bake...",
        },
        {
          title: "Spaghetti Carbonara",
          ingredients: "spaghetti, eggs, bacon, cheese...",
          instructions: "Cook spaghetti, mix with eggs and bacon...",
        },
        {
          title: "Chicken Curry",
          ingredients: "chicken, curry powder, coconut milk...",
          instructions: "Cook chicken with curry powder and coconut milk...",
        },
        {
          title: "Chocolate Cake",
          ingredients: "flour, sugar, cocoa powder, eggs...",
          instructions: "Mix ingredients and bake...",
        },
        {
          title: "Vegetable Stir Fry",
          ingredients: "vegetables, soy sauce, garlic...",
          instructions: "Stir fry vegetables with soy sauce and garlic...",
        },
      ];

      try {
        // Fetch images for trending recipes
        const images = await fetchImages('trending food');

        // Combine hardcoded recipes with images
        const recipesWithImages = hardcodedRecipes.map((recipe, index) => ({
          ...recipe,
          image: images[index % images.length]?.src.medium || 'https://via.placeholder.com/300x150', // Use a placeholder if no image is available
        }));

        setTrendingRecipes(recipesWithImages.slice(0, 7)); // Limit to 7 recipes
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingRecipesAndImages();
  }, []);

  // Auto-scroll every 4 seconds
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
              onViewRecipe={() => handleViewRecipe(recipe)} // Pass onViewRecipe prop
            />
          ))}
        </div>

        <button className="nav-arrow nav-arrow-right" onClick={scrollRight}>&#10095;</button>
      </div>

      {/* Render RecipeInfo modal if a recipe is selected */}
      {selectedRecipe && (
        <RecipeInfo recipe={selectedRecipe} onClose={handleCloseRecipeInfo} />
      )}
    </div>
  );
};

export default TrendingCuisine;