import React from 'react';
import './RecipeInfo.css';

const RecipeInfo = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="recipe-info-overlay" onClick={onClose}>
      <div className="recipe-info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="recipe-info-content">
          <div className="recipe-info-left">
            <img
              src={recipe.image || 'https://via.placeholder.com/300x150'}
              alt={recipe.title}
              className="recipe-image"
            />
          </div>
          <div className="recipe-info-right">
            <h1 className="recipe-title">{recipe.title}</h1>
            <h2 className="green-heading">Food Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.split('|').map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
            <h2 className="green-heading">Instructions</h2>
            <p className="instructions">{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;