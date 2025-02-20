import { Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../App.css";

const ideaList = [
  "A website that judges your sandwich cutting skills",
  "Rate how dramatically your cat ignores you",
  "Find the perfect bowtie for your turtle",
  "Document squirrels' secret meetings"
];

function Home() {
  const [randomIdea] = useState(ideaList[Math.floor(Math.random() * ideaList.length)]);

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <section className="hero">
          <h2 className="hero-title">Where Ridiculous Ideas Find Their Home ✨</h2>
          <p className="idea-showcase">Today's random silly idea: "{randomIdea}"</p>
          <br />
          <Link to="/join" className="cta-button bounce">Start Being Silly! 🎉</Link>
        </section>

        <section id="featured" className="featured">
          <h3 className="section-title">Top Silly Categories</h3>
          <div className="category-grid">
            <div className="category-card wobble">
              <h4>🍔 Food Crimes</h4>
              <p>Because who doesn't love debating about pineapple on pizza?</p>
            </div>
            <div className="category-card wobble">
              <h4>🐱 Pets Being Human</h4>
              <p>Your cat probably needs a LinkedIn profile</p>
            </div>
            <div className="category-card wobble">
              <h4>🤔 Why Though?</h4>
              <p>Ideas so bizarre they might just work</p>
            </div>
          </div>
        </section>

        <section id="join" className="join">
          <h3 className="section-title">Join Our Community of Silliness 🌈</h3>
          <p>Share your ideas, vote on others, become a legend!</p>
          <Link to="/join" className="secondary-button spin">Sign Up Now ⭐</Link>
        </section>
      </main>
      
      <div className="floating-objects">
        <span>🤪</span>
        <span>😂</span>
        <span>🎈</span>
        <span>🦄</span>
        <span>🍕</span>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
