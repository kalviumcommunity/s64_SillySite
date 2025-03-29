import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 
  
    try {
      const response = await axios.post("http://localhost:3000/api/mongo/login", { 
        email, 
        password 
      });
  
      const { token, userId } = response.data; // Extract token & userId
  
      localStorage.setItem("token", token);
  
      navigate(`/landing/${userId}`); // Redirect to landing page with userId
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again!");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back, Silly One! 🎭</h2>
      <p className="login-quote">"Silliness is the key to brilliance!" - Anonymous</p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your silly email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Super secret silly password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Let's Get Silly! 🎉"}
        </button>
      </form>

      <p className="signup-link">
        Not a member? <a href="/signup">Join the fun!</a>
      </p>
      <p className="footer-quote">"Life's too short to be serious all the time. Stay silly! 🤪"</p>
    </div>
  );
};

export default Login;
