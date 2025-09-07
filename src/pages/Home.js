import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { getRecipes } from "../services/api";
import RecipeList from "../components/RecipeList";
import "../styles/home.css";
import recipeimage from "../images/myrecipe.jpg";

const categories = ["All", "Breakfast", "Lunch", "Dinner"];

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));


useEffect(() => {
  if (openProfile) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
}, [openProfile]);


  useEffect(() => {
    (async () => {
      try {
        const res = await getRecipes();
        setRecipes(res.data || []);
        setFiltered(res.data || []);
      } catch (e) {
        console.error("Error fetching recipes:", e);
      }
    })();
  }, []);

  useEffect(() => {
    let list = [...recipes];

    if (activeCategory !== "All") {
      list = list.filter((r) => r.category === activeCategory);
    }

    if (searchTerm.trim()) {
      list = list.filter((r) =>
        (r.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "ratingHigh") {
      list.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));
    } else if (sortOption === "ratingLow") {
      list.sort((a, b) => (a.avgRating ?? 0) - (b.avgRating ?? 0));
    }

    setFiltered(list);
  }, [recipes, activeCategory, searchTerm, sortOption]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleUpload = () => {
    navigate("/upload");
  };

  const handleMyRecipes = () => {
    navigate("/myrecipes-page");
  };
  return (
    <div className="home-container">

    

      {/* Navbar */}
      <div className="navbar">
        <h3 className="navbar-title">🍲 Recipe Collection</h3>
        {/* Right side buttons */}
  <div className="navbar-actions">
    <button onClick={() => setOpenProfile(true)} className="profile-btn">
      My Profile
    </button>
  </div>

     {/* Profile Modal */}
{openProfile && (
  <div className="modal-overlay">
    <div className="modal-content profile-modal">
      <h2>👤 My Profile</h2>
      {user ? (
        <>
          <p><b><font color="green">Email:</font></b> <font color="blue">{user.email}</font></p>
          {user.username && <p><b><font color="green">Name:</font></b> <font color="blue">{user.username}</font></p>}
        </>
      ) : (
        <p>No user logged in.</p>
      )}

      <div className="profile-actions">
        <button onClick={handleLogout} className="logout-btn danger">
          Logout
        </button>
        <button
          onClick={() => setOpenProfile(false)}
          className="logout-btn close-btn"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
</div>

      {/* Single Filters Row */}
      <div className="filters">

        {/* Upload Button */}
        <button onClick={handleUpload} className="upload-btn">
          ➕ Upload Recipe
        </button>

        <button
      onClick={handleMyRecipes}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        backgroundColor: "#29c72eff",
        color: "white",
        padding: "10px 20px",
        border: "1px solid #044006ff",
        borderRadius: "3px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      <img
    src={recipeimage} // replace with your image path
    alt="Profile"
    style={{ width: "15px",marginleft:"10px"}}
  /> My Recipes
    </button>
      </div>

      {/* Recipes */}
      <RecipeList recipes={filtered} />
    </div>
  );
};

export default Home;