import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { User } from 'lucide-react'; // Importing login icon from lucide-react
import Login from '../Login/Login'; 
import './navbar.css';

const Navbar = ({ 
  primaryColor = '#28a745', 
  secondaryColor = '#00b74d', 
  backgroundColor = 'rgba(240, 240, 240, 0.85)' 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setNewOpen(!newOpen);
  };

  const closeMenu = () => {
    if (newOpen) setNewOpen(false);
  };

  const toggleLoginModal = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('login-modal-overlay')) {
      setIsLoginOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`} 
        style={{
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
          '--background-color': backgroundColor
        }}
      >
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
            AI CHEF RECIPES
          </NavLink>
          <div className={`mobile-menu-btn ${newOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-links ${newOpen ? 'active' : ''}`}>
            <NavLink to="/" className="nav-link" onClick={closeMenu}>HOME</NavLink>
            <NavLink to="/cuisine" className="nav-link" onClick={closeMenu}>CUISINE</NavLink>
            <NavLink to="/about" className="nav-link" onClick={closeMenu}>ABOUT US</NavLink>
            <NavLink to="/contact" className="nav-link" onClick={closeMenu}>CONTACT US</NavLink>
          </div>
          <div className="login-icon" onClick={toggleLoginModal}>
            <User size={24} />
          </div>
        </div>
      </nav>

      {isLoginOpen && (
        <div className="login-modal-overlay" onClick={handleOutsideClick}>
          <div className="login-modal">
            <Login />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;