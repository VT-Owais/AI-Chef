import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h3 className="recipe-title">{recipe.title}</h3>
      <button className="recipe-button" onClick={() => window.open(recipe.url, '_blank')}>
        View Recipe
      </button>
    </div>
  );
};

export default RecipeCard;