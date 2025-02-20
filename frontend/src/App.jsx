import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Join" element={<Join />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
