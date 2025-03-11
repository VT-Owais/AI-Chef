import React, { useState, useEffect, useRef } from 'react';
import TrendingCuisine from './trendingCuisine';
import ItalianCuisine from './ItalianCuisine'; 
import FamousMeals from './FamousMeals';
import './cuisine.css';

const Cuisine = () => {
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
    }, 4000);

    return () => clearInterval(interval);
  }, [scrollPosition]);


  return (
    <>
      {/* Trending Recipes Section */}
      <TrendingCuisine />

      {/* Italian Cuisine Section */}
      <ItalianCuisine />

      {/* Famous Meal section */}
      <FamousMeals />
    </>
  );
};

export default Cuisine;