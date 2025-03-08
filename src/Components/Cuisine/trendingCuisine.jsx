import React, { useState, useEffect, useRef } from 'react';
import './cuisine.css';
import RecipeCard from '../Home/RecipeCard'; // Correct import path
import RecipeInfo from '../Home/RecipeInfo'; // Correct import path

const TrendingCuisine = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [trendingRecipes, setTrendingRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track selected recipe
  const containerRef = useRef(null);

  // Use hardcoded recipes
  useEffect(() => {
    const hardcodedRecipes = [
      {
        title: "Chris' Popular Chocolate Mousse",
        ingredients: "350 mg Package Semi-Sweet Choco|Chips|1 pk Chocola…ream|1/4 c Margerine/butter|SpringForm Pan|Fridge",
        servings: "1 Servings",
        instructions: "THE CRUST Crush the wafers, preserving a few for g…ut 6 hours, though it might be ready before that.",
        image: "https://via.placeholder.com/300x150",
      },
      {
        title: "Pancakes",
        ingredients: "flour, milk, eggs...",
        instructions: "Mix ingredients and cook on a hot pan...",
        image: "https://via.placeholder.com/300x150",
      },
      {
        title: "Rock Cakes",
        ingredients: "flour, sugar, butter...",
        instructions: "Mix ingredients and bake...",
        image: "https://via.placeholder.com/300x150",
      },
      {
        title: "Spaghetti Carbonara",
        ingredients: "spaghetti, eggs, bacon, cheese...",
        instructions: "Cook spaghetti, mix with eggs and bacon...",
        image: "https://via.placeholder.com/300x150",
      },
      {
        title: "Chicken Curry",
        ingredients: "chicken, curry powder, coconut milk...",
        instructions: "Cook chicken with curry powder and coconut milk...",
        image: "https://via.placeholder.com/300x150",
      },
      {
        title: "Chocolate Cake",
        ingredients: "flour, sugar, cocoa powder, eggs...",
        instructions: "Mix ingredients and bake...",
        image: "https://via.placeholder.com/300x150",
      },
      {
        title: "Vegetable Stir Fry",
        ingredients: "vegetables, soy sauce, garlic...",
        instructions: "Stir fry vegetables with soy sauce and garlic...",
        image: "https://via.placeholder.com/300x150",
      },
    ];

    setTrendingRecipes(hardcodedRecipes); // Use hardcoded recipes
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
          setScrollPosition(scrollPosition + 320);
        }
      }
    }, 3000);

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
      setScrollPosition(scrollPosition - 320);
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (scrollPosition < maxScroll) {
        setScrollPosition(scrollPosition + 320);
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