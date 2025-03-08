import React from 'react';
import './RecipeInfo.css';

const RecipeInfo = ({ recipe, onClose }) => {
  if (!recipe) return null;

  // Split instructions into paragraphs
  const instructionParagraphs = recipe.instructions.split('\n').filter((para) => para.trim());

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
            <ol className="ingredients-list">
              {recipe.ingredients.split('|').map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ol>
            <h2 className="green-heading">Instructions</h2>
            <div className="instructions">
              {instructionParagraphs.map((paragraph, index) => (
                <div key={index} className="instruction-paragraph">
                  <p>
                    {paragraph.split('.').map(
                      (step, stepIndex) =>
                        step.trim() && (
                          <span key={stepIndex}>
                            • {step.trim()}
                            <br />
                          </span>
                        )
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeInfo;