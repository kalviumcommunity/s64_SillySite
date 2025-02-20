import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navbar">
      <h1>🎪 The Ultimate List of Silly Website Ideas</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Join">Join the Fun</Link>
      </div>
    </nav>
  );
}

export default Navigation;
