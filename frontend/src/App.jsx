import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import Signup from "./components/Signup"; // Import Signup page
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/signup" element={<Signup />} /> {/* Added Signup route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
