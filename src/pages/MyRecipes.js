import React, { useEffect, useState } from "react";
import { myRecipes } from "../services/api";
import RecipeList from "../components/RecipeList";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchMyRecipes = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await myRecipes();
        setRecipes(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10 text-lg">Please log in to see your recipes.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : recipes.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        <p>You have no recipes yet.</p>
      )}
    </div>
  );
};

export default MyRecipes;
