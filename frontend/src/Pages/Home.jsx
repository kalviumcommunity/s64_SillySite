// src/pages/Home.jsx
import React from 'react';
import '../App.css';

function Home() {
  return (
    <main>
        <div className="background-container"></div>
      <section className="hero">
        <h2>Your Silliest Idea</h2>
        <button className="cta-button">Let's be Silly</button>
      </section>
      
      <section id="features">
        <h3>Key Features</h3>
        <p>Discover and share the silliest ideas ever!</p>
      </section>
      
      <section id="about">
        <h3>About Us</h3>
        <p>We believe that every idea, no matter how silly, deserves a place.</p>
      </section>
    </main>
  );
}

export default Home;
