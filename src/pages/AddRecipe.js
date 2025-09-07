import React, { useState } from 'react';
import { addRecipe } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Breakfast');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      alert('You must be logged in to add a recipe.');
      return;
    }

    const recipeData = {
      name,
      category,
      description,
      image,
      userId: user.id || user._id // support both id formats
    };

    try {
      await addRecipe(recipeData);
      alert('Recipe added successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to add recipe!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Add Recipe</h2>
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded"
      />
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={e => setImage(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipe;