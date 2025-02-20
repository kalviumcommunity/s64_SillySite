import { Link } from "react-router-dom";
import "../styles/Join.css";

function Join() {
  return (
    <div className="join-container">
      <h1 className="join-title">🎉 Join the Silliest Community on the Internet! 🎭</h1>
      <p className="join-description">
        Ready to unleash your wildest ideas? Sign up now and become a **legend** in the world of ridiculous creativity!  
      </p>

      <div className="join-actions">
        <button className="join-button wobble">Sign Up 🚀</button>
        <Link to="/" className="back-home">← Back to Home</Link>
      </div>

      <div className="floating-objects">
        <span>🤪</span>
        <span>😂</span>
        <span>🎈</span>
        <span>🦄</span>
        <span>🍕</span>
      </div>
    </div>
  );
}

export default Join;
