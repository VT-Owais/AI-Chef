import React, { useState, useRef } from 'react';
import './cuisine.css';

const ItalianCuisine = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const boxWidth = 370; // Width of each box including gap

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - boxWidth, 0));
  };

  const scrollRight = () => {
    const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
    setScrollPosition((prev) => Math.min(prev + boxWidth, maxScroll));
  };

  return (
    <div className="italian-cuisine-section">
      <h2>ITALIAN CUISINE</h2>
      <p>From our kitchen to yours—discover the joy of cooking with our delicious Meal Kits!</p>
      <div className="carousel-container">
        <button className="carousel-arrow recipe-button left" onClick={scrollLeft}>&lt;</button>
        <div className="carousel" ref={containerRef} style={{ transform: `translateX(-${scrollPosition}px)` }}>

          <div className="cuisine-box">
            <img src="./src/assets/Images/food-img.png" alt="Pizza" />
            <h3>Hearty, wholesome meals for the whole family</h3>
            <p>PIZZA</p>
            <button>VIEW RECIPE</button>
          </div>

          <div className="cuisine-box">
            <img src="./src/assets/Images/food-img.png" alt="Pasta" />
            <h3>Hearty, wholesome meals for the whole family</h3>
            <p>PASTA</p>
            <button>VIEW RECIPE</button>
          </div>

          <div className="cuisine-box">
            <img src="./src/assets/Images/food-img.png" alt="Risotto" />
            <h3>Hearty, wholesome meals for the whole family</h3>
            <p>RISOTTO</p>
            <button>VIEW RECIPE</button>
          </div>

          <div className="cuisine-box">
            <img src="./src/assets/Images/food-img.png" alt="Lasagna" />
            <h3>Hearty, wholesome meals for the whole family</h3>
            <p>LASAGNA</p>
            <button>VIEW RECIPE</button>
          </div>

          <div className="cuisine-box">
            <img src="./src/assets/Images/food-img.png" alt="Tiramisu" />
            <h3>Hearty, wholesome meals for the whole family</h3>
            <p>TIRAMISU</p>
            <button>VIEW RECIPE</button>
          </div>

          <div className="cuisine-box">
            <img src="./src/assets/Images/food-img.png" alt="Bruschetta" />
            <h3>Hearty, wholesome meals for the whole family</h3>
            <p>BRUSCHETTA</p>
            <button>VIEW RECIPE</button>
          </div>

          <div className="cuisine-box">
            <img src="./src/assets/Images/food-img.png" alt="Gelato" />
            <h3>Hearty, wholesome meals for the whole family</h3>
            <p>GELATO</p>
            <button>VIEW RECIPE</button>
          </div>
        </div>
        <button className="carousel-arrow right recipe-button" onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  );
};

export default ItalianCuisine;