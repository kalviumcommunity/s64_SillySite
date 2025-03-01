import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import "../App.css";
import "../styles/Signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    sillinessLevel: "medium",
  });

  const sillyUsernameSuggestions = [
    "GiggleMaster3000",
    "WackyWizard",
    "SillyNinja",
    "ChuckleChamption",
    "JesterJedi",
  ];

  const getRandomSuggestion = () => {
    const random = Math.floor(Math.random() * sillyUsernameSuggestions.length);
    setFormData({ ...formData, username: sillyUsernameSuggestions[random] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await response.json(); 
  
      if (response.ok) {
        alert("Signup successful! You can now log in.");
        navigate(`/landing/${data.userId}`); // Redirect to login page
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="app">
      <main className="main-content">
        <section className="hero">
          <h2 className="hero-title">Join the Silliness! 🎈</h2>
          <p className="idea-showcase">Where every silly idea is a good idea!</p>

          <div className="signup-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Choose Your Silly Username</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={getRandomSuggestion}
                    className="inspire-button"
                  >
                    Inspire Me! 🎲
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Secret Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sillinessLevel">Your Silliness Level</label>
                <select 
                  id="sillinessLevel"
                  name="sillinessLevel"
                  value={formData.sillinessLevel}
                  onChange={handleChange}
                  className="silliness-select"
                >
                  <option value="low">Just a bit silly 😊</option>
                  <option value="medium">Pretty silly 🤪</option>
                  <option value="high">Super silly 🤡</option>
                  <option value="extreme">MAXIMUM SILLINESS 🎪</option>
                </select>
              </div>

              <button type="submit" className="signup-button">
                Begin Your Silly Adventure! 🚀
              </button>
            </form>

            <p className="login-link">
              Already part of the circus? <Link to="/login">Login here!</Link>
            </p>
          </div>
        </section>
      </main>

      <div className="floating-objects">
        <span>🎪</span>
        <span>🎨</span>
        <span>🎢</span>
        <span>🤪</span>
        <span>😂</span>
        <span>🎈</span>
        <span>🦄</span>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignUp;