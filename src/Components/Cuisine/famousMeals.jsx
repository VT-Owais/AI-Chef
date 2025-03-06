import React from 'react';
import './cuisine';

const FamousMeals = () => {
  return (
    <div className="famous-meals-section">
      <h2>FAMOUS MEALS</h2>
      <p>Bring the restaurant home! Explore our Meal Kits and cook like a pro in your own kitchen.</p>

      <div className="famous-meals-container">

        <div className="famous-meal-card">
          <div className="meal-image">
            <img src="./src/assets/Images/food-img.png" alt="Pizza" />
          </div>
          <h3 className="meal-title">Hearty, wholesome meals for the whole family</h3>
          <p className="meal-description">PIZZA</p>
          <button className="meal-button">VIEW RECIPE</button>
        </div>

        <div className="famous-meal-card">
          <div className="meal-image">
            <img src="./src/assets/Images/food-img.png" alt="Pizza" />
          </div>
          <h3 className="meal-title">Hearty, wholesome meals for the whole family</h3>
          <p className="meal-description">PIZZA</p>
          <button className="meal-button">VIEW RECIPE</button>
        </div>

        <div className="famous-meal-card">
          <div className="meal-image">
            <img src="./src/assets/Images/food-img.png" alt="Pizza" />
          </div>
          <h3 className="meal-title">Hearty, wholesome meals for the whole family</h3>
          <p className="meal-description">PIZZA</p>
          <button className="meal-button">VIEW RECIPE</button>
        </div>

        <div className="famous-meal-card">
          <div className="meal-image">
            <img src="./src/assets/Images/food-img.png" alt="Pizza" />
          </div>
          <h3 className="meal-title">Hearty, wholesome meals for the whole family</h3>
          <p className="meal-description">PIZZA</p>
          <button className="meal-button">VIEW RECIPE</button>
        </div>

        <div className="famous-meal-card">
          <div className="meal-image">
            <img src="./src/assets/Images/food-img.png" alt="Pizza" />
          </div>
          <h3 className="meal-title">Hearty, wholesome meals for the whole family</h3>
          <p className="meal-description">PIZZA</p>
          <button className="meal-button">VIEW RECIPE</button>
        </div>
      </div>
    </div>
  );
};

export default FamousMeals;