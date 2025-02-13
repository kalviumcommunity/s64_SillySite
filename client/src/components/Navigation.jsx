// src/components/Navigation.jsx
import React from 'react';
import '../App.css';

function Navigation() {
  return (
    <nav>
      <h1>SillySite</h1>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navigation;
