import React, { useState } from 'react';
import './RecipeCard.css';
import RecipeInfo from './RecipeInfo';

const RecipeCard = ({ recipe }) => {
  const [showRecipeInfo, setShowRecipeInfo] = useState(false);

  return (
    <>
      <div className="recipe-card">
        <img
          src={recipe.image || 'https://via.placeholder.com/300x150'}
          alt={recipe.title}
          className="recipe-image"
        />
        <h3 className="recipe-title">{recipe.title}</h3>
        <button className="recipe-button" onClick={() => setShowRecipeInfo(true)}>
          View Recipe
        </button>
      </div>
      {showRecipeInfo && (
        <RecipeInfo recipe={recipe} onClose={() => setShowRecipeInfo(false)} />
      )}
    </>
  );
};

export default RecipeCard;