import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById, rateRecipe } from '../services/api';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const recipeOwnerId = recipe?.userId;
  const currentUserId = user?.id || user?._id;

  useEffect(() => {
    (async () => {
      try {
        const res = await getRecipeById(id);
        setRecipe(res.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  const handleRating = async () => {
    if (!user) {
      alert('Please login to rate recipes.');
      return;
    }
    if (recipeOwnerId && currentUserId && recipeOwnerId === currentUserId) {
      alert("You cannot rate your own recipe!");
      return;
    }
    const value = Number(rating);
    if (Number.isNaN(value) || value < 1 || value > 5) {
      alert('Please enter a rating between 1 and 5.');
      return;
    }
    try {
      await rateRecipe(id, value);
      alert('Rating submitted!');
      const res = await getRecipeById(id);
      setRecipe(res.data);
      setRating(0);
    } catch (e) {
      console.error(e);
      alert('Failed to submit rating!');
    }
  };

  if (!recipe) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
      <p className="mb-2"><strong>Category:</strong> {recipe.category}</p>
      <p className="mb-4 whitespace-pre-line">{recipe.description}</p>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.name} className="w-full rounded mb-4" />
      )}
      <p className="mb-2">⭐ Average Rating: {recipe.avgRating ?? 'No ratings yet'}</p>

      {(!currentUserId || recipeOwnerId !== currentUserId) && (
        <div className="mt-4 flex items-center gap-2">
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border rounded px-2 py-1 w-24"
          />
          <button
            onClick={handleRating}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            Rate Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;