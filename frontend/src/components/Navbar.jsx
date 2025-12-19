import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold">
            EBD Project
          </Link>
          
          {user && (
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-gray-300">
                Dashboard
              </Link>
              
              {isStudent && (
                <>
                  <Link to="/purchase-request" className="hover:text-gray-300">
                    New Purchase
                  </Link>
                  <Link to="/my-purchases" className="hover:text-gray-300">
                    My Purchases
                  </Link>
                </>
              )}
              
              {isAdmin && (
                <Link to="/admin" className="hover:text-gray-300">
                  Admin Panel
                </Link>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">
                Welcome, {user.profile?.name || user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;