import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/MyIdea.css"

const MyIdeas = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ideas
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/mysql/ideas/user/${userId}`);
        setIdeas(response.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [userId]);

  // Handle delete functionality
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this idea?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/mysql/ideas/${id}`);
      setIdeas(ideas.filter((idea) => idea._id !== id)); // Remove the idea from the UI
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  if (loading) {
    return <p>Loading ideas...</p>;
  }

  return (
    <div className="ideas-container">
      <h2>My Shared Ideas 💡</h2>
      {ideas.length === 0 ? (
        <p className="no-ideas">No ideas shared yet. Start creating!</p>
      ) : (
        ideas.map((idea) => (
          <div key={idea._id} className="idea-card">
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <span className="category">#{idea.category}</span>
            <button className="delete-btn" onClick={() => handleDelete(idea._id)}>❌ Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyIdeas;
