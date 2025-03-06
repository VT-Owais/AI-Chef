import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-image">
          <img src="./src/assets/Images/about-img.jpg" alt="Pizza" />
        </div>
        <div className="about-text">
          <h2>ABOUT</h2>
          <p>
            At Kitchen Comforts, we know the value of a home-cooked meal. Every
            dish we create is made fresh on-site, with ingredients sourced or
            harvested on the same day. We believe in slow cooking and meal-
            savoring - because good things take time.
          </p>
          <p>
            Now that times have changed, we must adapt. With our new Cook-It-
            Yourself (CIY) Meal Kits, we bring the Kitchen Comfort experience
            straight to your doorstep. Inside, you'll find everything you need to
            recreate our beloved home-style meals: Easy to follow illustrated
            recipes, prepared ingredients, and even a QR code for real-time
            cooking videos to help you unleash your inner chef.
          </p>
          <p>
            Times have changed, but our philosophy has not. We believe in the
            life-changing comfort of a good meal - and now you can cook it yourself!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;