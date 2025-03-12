import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './home.css';
import RecipeCard from './RecipeCard';
import RecipeInfo from './RecipeInfo';

const Home = ({ handleSearch, searchQuery, setSearchQuery, recipes }) => {
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = [heroRef.current, whatIsRef.current, howItWorksRef.current];

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleViewRecipe = (recipe) => {
    console.log('View Recipe Clicked:', recipe);
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeInfo = () => {
    setSelectedRecipe(null);
  };

  return (
    <>
      <div ref={heroRef} className="home-page">
        <div className="hero-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search for your recipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button">
                <FaSearch className="search-icon" />
              </button>
            </div>
          </form>
          <p>MORE THAN 200,000 RECIPES AVAILABLE</p>
        </div>
        <div className="search-results">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onViewRecipe={() => handleViewRecipe(recipe)}
            />
          ))}
        </div>
      </div>

      <div ref={whatIsRef} className="what-is">
        <div className="card-img">
          <img src="./src/assets/Images/what-is-img.png" alt="Pizza" />
        </div>
        <div className="card-para">
          <h1>What is AI Chef ?</h1>
          <p>AI Chef is your go-to culinary assistant! Simply type in the name of a dish, and it instantly delivers a step-by-step  recipe. From classic Margherita pizza to spicy Thai curry or decadent chocolate lava cake, AI Chef has it all. <br />
            It also offers cooking tips, ingredient swaps, and nutritional insights to make cooking easier and more fun. Whether you're a beginner or a pro, AI Chef helps you create delicious meals effortlessly.
            Say goodbye to endless searches and hello to stress-free cooking with AI Chef—your kitchen's new best friend!</p>
        </div>
      </div>

      <div ref={howItWorksRef} className="how-it-works">
        <div className="how-it-works-header">
          <h2>HOW IT WORKS</h2>
        </div>
        <div className="how-it-works-content">
          <div className="how-it-works-step">
            <div className="step-number">1</div>
            <p>We have more than 200,000 recipes ready for you</p>
          </div>
          <div className="how-it-works-step">
            <div className="step-number">2</div>
            <p>Search for the recipe you are looking for in just a few steps</p>
          </div>
          <div className="how-it-works-step">
            <div className="step-number">3</div>
            <p>We offer a huge coverage of all cuisines and international recipes</p>
          </div>
        </div>
      </div>

      {/* Render RecipeInfo modal if a recipe is selected */}
      {selectedRecipe && (
        <RecipeInfo recipe={selectedRecipe} onClose={handleCloseRecipeInfo} />
      )}
    </>
  );
};

export default Home;