import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI states
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/recipes");
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();

        setRecipes(Array.isArray(data) ? data : []);
        setFilteredRecipes(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filtering + sorting logic
  useEffect(() => {
    let updated = [...recipes];

    if (category !== "All") {
      updated = updated.filter(
        (recipe) =>
          recipe.category &&
          recipe.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchTerm) {
      updated = updated.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === "name") {
      updated.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      updated.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredRecipes(updated);
  }, [recipes, category, searchTerm, sortBy]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading recipes...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>⚠ {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {["All", "Breakfast", "Lunch", "Dinner"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: category === cat ? "#4CAF50" : "#f4f4f4",
              color: category === cat ? "#fff" : "#333",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {cat}
          </button>
        ))}

        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "200px",
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Recipe Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No recipes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;