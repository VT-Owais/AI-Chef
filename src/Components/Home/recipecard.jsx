import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onViewRecipe }) => {
  console.log('RecipeCard Props:', recipe, onViewRecipe); 
  return (
    <div className="recipe-card">
      <img
        src={recipe.image || 'https://via.placeholder.com/300x150'}
        alt={recipe.title}
        className="recipe-image"
      />
      <h3 className="recipe-title">{recipe.title}</h3>
      <button className="recipe-button" onClick={onViewRecipe}>
        View Recipe
      </button>
    </div>
  );
};

export default RecipeCard;


