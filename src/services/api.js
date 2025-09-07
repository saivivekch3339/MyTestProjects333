import axios from "axios";

// Adjust baseURL to match your backend server
const API = axios.create({ baseURL: "http://localhost:8080/api" });

// ✅ Attach token automatically if logged in
API.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token; // if you add JWT later
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Global error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

// --- AUTH ---
export const loginUser = async (credentials) => {
  const res = await API.post("/auth/login", credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

// --- RECIPES ---
export const addRecipe = async (recipe) => {
  const res = await API.post("/recipes", recipe);
  return res.data;
};

export const getRecipes = async () => {
  const res = await API.get("/recipes");
  return res.data;
};

export const getRecipeById = async (id) => {
  const res = await API.get(`/recipes/${id}`);
  return res.data;
};

export const rateRecipe = async (id, rating) => {
  console.log("API - rateRecipe called with id:", id, "and rating:", rating);
  const userEmail = localStorage.getItem("user").email;
const res = await API.post(
  `/recipes/${id}/rate?rating=${rating}&userEmail=${userEmail}`
);

  return res.data;
};

export const myRecipes = async (email) => {
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  const res = await API.get(`/getrecipesByEmailId/${userEmail}`);
  return res.data;
};
