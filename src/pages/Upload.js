import React, { useState } from "react";
import "../styles/upload.css";


const Upload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    category: "",
    authorEmail: "",
  });

  
  const [file, setFile] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Convert image file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert ingredients & steps into arrays
    const ingredientsArray = formData.ingredients
      ? formData.ingredients.split(",").map((i) => i.trim())
      : [];
    const stepsArray = formData.steps
      ? formData.steps.split(",").map((s) => s.trim())
      : [];

    let base64Image = null;
    if (file) {
      base64Image = await toBase64(file);
    }

    // Final payload
    const payload = {
      ...formData,
      ingredients: ingredientsArray,
      steps: stepsArray,
      imageUrl: base64Image,
    };

    try {
      const response = await fetch("http://localhost:8080/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        alert("Recipe uploaded successfully!");
        
      } else {
        console.error("Failed to upload recipe");
        alert( "Recipe upload Failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
   <div className="upload-container"> 
    <form onSubmit={handleSubmit} className="upload-form">
      <h2><u>Upload a New Recipe</u></h2>
      <label> Recipe Name </label>
      <input
        type="text"
        name="title"
        autoComplete="off"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label> Description </label>
      <textarea
        name="description"
        placeholder="Description"
        autoComplete="off"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <label> Ingredients Required </label>
      <input
        type="text"
        name="ingredients"
        autoComplete="off"
        placeholder="Ingredients (comma separated)"
        value={formData.ingredients}
        onChange={handleChange}
      />
      <label> Recipe Steps </label>
      <textarea
        type="text"
        name="steps"
        columns="30"
        rows="5"
        autoComplete="off"
        placeholder="Steps (comma separated)"
        value={formData.steps}
        onChange={handleChange}
      />
      <label> Category </label>
      <input
        type="text"
        name="category"
        autoComplete="off"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <label> Author Email </label>
      <input
        type="email"
        name="authorEmail"
        placeholder="Author Email"
        value={formData.authorEmail}
        onChange={handleChange}
        required
      />
      <label> Recipe Image </label>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" className="upload-form">Upload Recipe </button>
    </form>
    </div>
  );
};

export default Upload;
