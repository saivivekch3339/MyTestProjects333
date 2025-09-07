import axios from "axios";
import React, { useState } from "react";
import { rateRecipe } from "../services/api";

const safeId = (recipe) => recipe?.id || recipe?._id;

const RecipeCard = ({ recipe }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(recipe.averageRating || 0);
  const [loading, setLoading] = useState(false);

  const handleRating = async (star) => {
  setLoading(true);
  try {
    const API = axios.create({ baseURL: "http://localhost:8080/api" });

    // If you stored user as JSON string in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;
     console.log("User email from localStorage:", userEmail);
     console.log("Safe Id:", recipe.id);
      console.log("Safe star:", star);
    const res = await API.post(
      `/recipes/${recipe.id}/rate?rating=${star}&userEmail=${userEmail}`
    );

    alert(`Rating ${star} Saved Sucessfully for Recipe ${recipe.title}!`);
    console.log("Server response:", res.data);
  } catch (err) {
    console.error("Error sending rating:", err);
    alert("Failed to save rating. Please try again.");
  } finally {
    setLoading(false);
  }
};

  
  return (
    <div className="recipe-card">
      {/* Recipe Image */}
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} />
      )}

      {/* Card Content */}
      <div className="recipe-card-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <p className="category">Category: {recipe.category || "Uncategorized"}</p>

        {/* Rating (stars) */}
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => !loading && handleRating(star)}
              style={{
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {star <= rating ? "★" : "☆"}
            </span>
          ))}
        </div>

<div style={{ margin: "10px" }}>
      {/* View Recipe Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        View Recipe
      </button>

      {/* Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "wheat",
              padding: "20px",
              borderRadius: "12px",
              width: "400px",
              boxShadow: "0px 4px 15px rgba(78, 38, 38, 0.3)",
              position: "relative",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>{recipe.title}</h2>
            <p style={{ marginBottom: "10px" }}>{recipe.description}</p>
            <p>
              <b>Ingredients:</b> {recipe.ingredients}
            </p>
            <p>
              <b>Steps:</b> {recipe.steps}
            </p>

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "transparent",
                fontSize: "18px",
                cursor: "pointer",
                color: "#5e0a0aff",
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>        
          
      </div>
    </div>
  );
};

export default RecipeCard;