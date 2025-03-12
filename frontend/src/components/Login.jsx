import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post('/api/login', { 
        email, 
        password 
      });

      // Save the token to localStorage or sessionStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to dashboard or home page
      navigate('/dashboard');
    } catch (err) {
      // Handle login errors
      setError(err.response?.data?.error || "Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back, Silly One! 🎭</h2>
      <p className="login-quote">"Silliness is the key to brilliance!" - Anonymous</p>
      
      {error && (
        <div className="error-message" style={{ 
          color: 'red', 
          marginBottom: '15px', 
          textAlign: 'center' 
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter your silly email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Super secret silly password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Let's Get Silly! 🎉</button>
      </form>
      <p className="signup-link">Not a member? <a href="/signup">Join the fun!</a></p>
      <p className="footer-quote">"Life's too short to be serious all the time. Stay silly! 🤪"</p>
    </div>
  );
};

export default Login;