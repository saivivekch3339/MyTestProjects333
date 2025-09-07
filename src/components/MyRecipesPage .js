import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/myrecipepage.css";

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);


  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const API = axios.create({ baseURL: "http://localhost:8080/api" });
        const user = JSON.parse(localStorage.getItem("user"));
        const userEmail = user?.email;

        if (!userEmail) {
          setLoading(false);
          return;
        }

        const res = await API.get(`/getrecipesByEmailId/${userEmail}`);
        setRecipes(res.data || []);
      } catch (err) {
        console.error("Error fetching user recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/recipes/${id}`);

      alert("Successfully  deleted recipe.");
      setRecipes((prev) => prev.filter((r) => (r.id || r._id) !== id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className="recipe-container">
      <h2 className="page-title">🍳 My Recipes</h2>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your recipes...</p>
        </div>
      )}

      {!loading && recipes.length === 0 && (
        <div className="empty">
          <p>You have no recipes yet.</p>
        </div>
      )}

      {!loading && recipes.length > 0 && (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id || recipe._id} className="recipe-card">
              {recipe.imageUrl && (
                <img
                  src={
                    recipe.imageUrl.startsWith("data:image")
                      ? recipe.imageUrl
                      : recipe.imageUrl.startsWith("http")
                      ? recipe.imageUrl
                      : `http://localhost:8080/${recipe.imageUrl.replace(/^\/+/, "")}`
                  }
                  alt={recipe.title}
                  className="recipe-img"
                />
              )}

              <div className="recipe-card-content">
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <p className="category">
                  Category: {recipe.category || "Uncategorized"}
                </p>

                <div className="card-actions">
                  <button
                    className="view-btn"
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setOpen(true);
                    }}
                  >
                    View Recipe
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(recipe.id || recipe._id)}
                  >
                    Delete
                  </button>

                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && selectedRecipe && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.description}</p>
            <p>
              <b>Ingredients:</b> {selectedRecipe.ingredients}
            </p>
            <p>
              <b>Steps:</b> {selectedRecipe.steps}
            </p>
            <button className="modal-close" onClick={() => setOpen(false)}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;
