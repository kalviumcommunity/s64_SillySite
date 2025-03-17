import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";
import SignUpPage from "./pages/signup";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/login";
import ShareIdeaForm from "./components/ShareIdeaForm";
import "./App.css";
// const userId = '67c284cd5ac1769e93e14b7f';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/signup" element={<SignUpPage/>} /> {/* Added Signup route */}
          <Route path="/landing/:userId" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/share-idea" element={<ShareIdeaForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
