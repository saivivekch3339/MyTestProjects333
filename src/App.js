import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import MyRecipesPage from "./components/MyRecipesPage ";

// ✅ Private route wrapper
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default route - redirect to login if not authenticated */}
        <Route path="/" element={<PrivateRoute><Login /></PrivateRoute>} />

        {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add-recipe" element={<PrivateRoute><AddRecipe /></PrivateRoute>} />
        <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetails /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
        <Route path="/myrecipes-page" element={<PrivateRoute><MyRecipesPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;