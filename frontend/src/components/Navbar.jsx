import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-modern">
      <div className="container">
        <Link to="/" className="navbar-brand-modern">
          <i className="bi bi-leaf-fill me-2"></i>
          EBD Platform
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link-modern" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-speedometer2 me-1"></i>
                    Dashboard
                  </Link>
                </li>
                
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link-modern dropdown-toggle" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="bi bi-gear me-1"></i>
                    Features
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/farm-registration" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                        <i className="bi bi-house-door me-2"></i>
                        Farm Registration
                      </Link>
                    </li>
                    <li>
                      <Link to="/ai-recommendations" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                        <i className="bi bi-robot me-2"></i>
                        AI Recommendations
                      </Link>
                    </li>
                    <li>
                      <Link to="/emission-dashboard" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                        <i className="bi bi-graph-up me-2"></i>
                        Emission Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/carbon-credits" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                        <i className="bi bi-credit-card me-2"></i>
                        Carbon Credits
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {isStudent && (
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link-modern dropdown-toggle" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="bi bi-cart me-1"></i>
                      Purchases
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/purchase-requests" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                          <i className="bi bi-list-ul me-2"></i>
                          Browse Credits
                        </Link>
                      </li>
                      <li>
                        <Link to="/create-purchase-request" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                          <i className="bi bi-plus-circle me-2"></i>
                          New Purchase
                        </Link>
                      </li>
                      <li>
                        <Link to="/my-purchase-requests" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                          <i className="bi bi-inbox me-2"></i>
                          My Requests
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                
                {isAdmin && (
                  <li className="nav-item dropdown">
                    <a 
                      className="nav-link-modern dropdown-toggle" 
                      href="#" 
                      role="button" 
                      data-bs-toggle="dropdown"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="bi bi-shield-check me-1"></i>
                      Admin
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/admin" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                          <i className="bi bi-speedometer2 me-2"></i>
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/purchase-requests" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                          <i className="bi bi-clipboard-check me-2"></i>
                          Manage Requests
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link-modern" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-house me-1"></i>
                    Home
                  </Link>
                </li>
              </>
            )}
          </ul>
          
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link-modern dropdown-toggle d-flex align-items-center" 
                    href="#" 
                    role="button" 
                    data-bs-toggle="dropdown"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    <span>{user.profile?.name || user.username || user.email}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <span className="dropdown-item-text">
                        <small className="text-muted">Role: {user.role}</small>
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger"
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link-modern" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-primary btn-sm ms-2" onClick={() => setIsMenuOpen(false)}>
                    <i className="bi bi-person-plus me-1"></i>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
