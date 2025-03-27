import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/form.css"; // Ensure you have appropriate styles

const ShareIdeaForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get idea ID from URL if updating

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/ideas/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCategory(response.data.category);
        })
        .catch(error => console.error("Error fetching idea:", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !category.trim()) {
      return alert("Please fill in all fields!");
    }
  
    try {
      const userId = "67a9e0ff1505e6a129a1d1df"; // Replace with actual user ID (get from context or local storage)
  
      if (id) {
        await axios.put(`http://localhost:3000/api/mysql/ideas/${id}`, { title, description, category, userId });
      } else {
        await axios.post("http://localhost:3000/api/mysql/ideas", { title, description, category, userId });
      }
  
      navigate("/landing/67a9e0ff1505e6a129a1d1df"); // Redirect after submission
    } catch (error) {
      console.error("Error submitting idea:", error.response?.data || error.message);
      alert("Failed to submit idea. Check console for details.");
    }
  };
  

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this idea?")) return;
    
    try {
      await axios.delete(`/api/ideas/${id}`);
      navigate("/landing"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting idea:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Your Silly Idea ✏️" : "Share Your Silly Idea! 🤪"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <button type="submit">{id ? "Update Idea 🔄" : "Submit Idea 🚀"}</button>
        <button type="button" onClick={handleDelete}>Delete Idea 🗑️</button>
        <button type="button" onClick={() => navigate("/landing")}>Cancel ❌</button>
      </form>
    </div>
  );
};

export default ShareIdeaForm;
