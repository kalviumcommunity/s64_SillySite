import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import SignUpPage from "./pages/signup";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/signup" element={<SignUpPage/>} /> {/* Added Signup route */}
          <Route path="/landing/:userId" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
