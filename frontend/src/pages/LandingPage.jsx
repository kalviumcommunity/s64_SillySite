import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/landing.css"

const LandingPage = () => {
  const { userId } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bounceCount, setBounceCount] = useState(0);
  const [joke, setJoke] = useState("");
  const titleRef = useRef(null);

  // Silly jokes array
  const sillyJokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What's the best thing about Switzerland? I don't know, but their flag is a big plus!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised!",
    "What do you call a fake noodle? An impasta!"
  ];

  // Get random joke
  useEffect(() => {
    const randomJoke = sillyJokes[Math.floor(Math.random() * sillyJokes.length)];
    setJoke(randomJoke);
    
    // Silly title wiggle effect
    const interval = setInterval(() => {
      if (titleRef.current) {
        titleRef.current.style.transform = `rotate(${Math.random() * 6 - 3}deg)`;
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch with a deliberate small delay to show our funny loading state
    setTimeout(() => {
      fetch(`http://localhost:3000/api/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Store user data
          setLoading(false);
        })
        .catch(() => {
          setError("Oops! We lost your name in the chaos! Did the hamsters running our servers take a coffee break? 🐹☕");
          setLoading(false);
        });
    }, 1500);
  }, [userId]);

  // Handle title bounce count for easter egg
  const handleTitleClick = () => {
    setBounceCount(prev => prev + 1);
    if (bounceCount >= 5) {
      alert("🎉 You found the secret bounce! Here's a virtual cookie: 🍪");
      setBounceCount(0);
    }
  };

  const loadingMessages = [
    "Herding cats to fetch your data...",
    "Teaching monkeys to type your name...",
    "Convincing robots that humans are still useful...",
    "Bribing pixels to arrange properly..."
  ];
  
  const randomLoadingMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <div className="silly-container">
      {/* Floating emojis background */}
      <div className="emoji-background">
        {['🎈', '🎭', '🤪', '🦄', '🍩', '👽', '🤡'].map((emoji, i) => (
          <div 
            key={i}
            className="floating-emoji"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <h1 
        ref={titleRef}
        className="silly-title"
        onClick={handleTitleClick}
      >
        Welcome to SillySite! 🎉
      </h1>
      <p className="silly-subtitle">
        Where only the silliest ideas survive! <span className="spinning-emoji">😆</span>
      </p>
      
      {loading ? (
        <div className="loading-container">
          <p className="loading-message">{randomLoadingMessage} ⏳</p>
          <div className="bouncing-letters">
            {[..."LOADING"].map((letter, i) => (
              <span 
                key={i} 
                className="bounce-letter"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="error-container">
          <p>{error}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try again? Pretty please? 🥺
          </button>
        </div>
      ) : (
        <div className="user-card">
          <div className="username-container">
            <h2 className="username">
              Hi {user.username}! 👋
            </h2>
            <span className="sparkle">✨</span>
          </div>
          
          <p className="membership-text">
            You're officially a member of <span className="silly-highlight">SillySite!</span> 🎭
          </p>
          
          <div className="image-container">
            <img 
              src="/api/https://i.imgflip.com/1vzy8u.jpg/300/200"
              alt="Funny Gif"
              className="silly-image"
            />
            <div className="image-overlay">
              <p className="overlay-text">Super silly image!</p>
            </div>
          </div>
          
          <div className="joke-container">
            <p className="joke-title">Daily Dose of Silliness:</p>
            <p className="joke-text">{joke}</p>
          </div>
          
          <div className="button-container">
            <button className="share-button">
              Share Silly Idea 💡
            </button>
            <button className="friend-button">
              Find Friends 🧑‍🤝‍🧑
            </button>
          </div>
          
          <p className="footer-text">
            Now go share your wackiest ideas! <span className="bouncing-rocket">🚀</span>
          </p>
        </div>
      )}
  <Footer/>
    </div>
  );
};

export default LandingPage;