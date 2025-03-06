import React, { useState, useEffect, useRef } from 'react';
import './cuisine.css';

const TrendingCuisine = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);

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

  return (
    <div className="container-cuisine-section">
      <h2 className="center-head">TRENDING RECIPES</h2>
      <div className="header-subtitle">
        <p>Take home the Kitchen Comforts experience Try our Meal Kits and unleash your inner chef!</p>
      </div>

      <div className="trending-container-wrapper">
        <button className="nav-arrow nav-arrow-left" onClick={scrollLeft}>&#10094;</button>

        <div className="trending-recipes-container" ref={containerRef}>
          {/* Recipe Cards */}
          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Hearty, wholesome meals for the whole family</h3>
            <p className="recipe-description">Delicious comfort food that everyone will love</p>
            <button className="recipe-button">TRY OUR FAMILY FEAST KITS</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Vegan favorites with a delicious twist</h3>
            <p className="recipe-description">Plant-based recipes full of flavor</p>
            <button className="recipe-button">VIEW OUR VEGAN OPTIONS</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>

          <div className="recipe-card">
            <div className="recipe-image">
              <img src="./src/assets/Images/food-img.png" alt="Recipe" />
            </div>
            <h3 className="recipe-title">Asian delights to take you on a culinary trip</h3>
            <p className="recipe-description">Authentic flavors from across Asia</p>
            <button className="recipe-button">EAT YOUR WAY TO ASIA</button>
          </div>
        </div>

        <button className="nav-arrow nav-arrow-right" onClick={scrollRight}>&#10095;</button>
      </div>
    </div>
  );
};

export default TrendingCuisine;