import { useState, useEffect } from "react";
import "../styles/Find.css";

const FindFriends = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/mysql/users"); // Fetch from backend API
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (id) => {
    try {
      const response = await fetch(`/api/follow/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to follow user");
      setFollowing((prev) => new Set(prev).add(id)); // Update UI instantly
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p className="loading">Loading awesome people...</p>;
  if (error) return <p className="error">Oops! Something went wrong. Try again later.</p>;

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for cool people..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />
      <div className="users-list">
        {users
          .filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
            <div key={user._id} className="user-card">
              <p className="username">{user.username}</p>
              <p className="user-desc">Might be cool, might be a robot 🤖</p>
              <button
                className={`follow-btn ${following.has(user._id) ? "followed" : ""}`}
                onClick={() => handleFollow(user._id)}
                disabled={following.has(user._id)}
              >
                {following.has(user._id) ? "Following 😎" : "Follow (No stalking!)"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FindFriends;