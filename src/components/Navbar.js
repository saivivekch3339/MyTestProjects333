import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">Recipe Book</Link>
        <ul className="flex items-center gap-4">
          <li><Link className="hover:underline" to="/">Home</Link></li>
          {user && <li><Link className="hover:underline" to="/my-recipes">My Recipes</Link></li>}
          {user && <li><Link className="hover:underline" to="/add-recipe">Add Recipe</Link></li>}
          {!user && <li><Link className="hover:underline" to="/login">Login</Link></li>}
          {!user && <li><Link className="hover:underline" to="/register">Register</Link></li>}
          {user && (
            <li>
              <button
                onClick={handleLogout}
                className="bg-white/10 px-3 py-1 rounded hover:bg-white/20"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;