import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  const features = [
    {
      icon: "🔐",
      title: "User Authentication",
      description: "Secure registration and login with JWT tokens and password hashing",
      link: "/login",
      color: "primary"
    },
    {
      icon: "🌱",
      title: "Farm Registration",
      description: "Register farms with GPS location capture and backend integration",
      link: "/farm-registration",
      color: "success"
    },
    {
      icon: "🤖",
      title: "AI Recommendations",
      description: "Get intelligent recommendations for reducing emissions",
      link: "/ai-recommendations",
      color: "info"
    },
    {
      icon: "📊",
      title: "Emission Tracking",
      description: "Track and visualize your carbon emissions with interactive dashboards",
      link: "/emission-dashboard",
      color: "warning"
    },
    {
      icon: "💳",
      title: "Carbon Credits",
      description: "Generate and manage carbon credits from emission reductions",
      link: "/carbon-credits",
      color: "success"
    },
    {
      icon: "🛒",
      title: "Purchase Requests",
      description: "Browse and purchase carbon credits from verified farms",
      link: "/purchase-requests",
      color: "danger"
    }
  ];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="page-title">
                <i className="bi bi-leaf-fill me-3"></i>
                Environmental Benefits Dashboard
              </h1>
              <p className="page-subtitle">
                Empowering farmers with sustainable practices and carbon credit management
              </p>
              {!isAuthenticated && (
                <div className="mt-4">
                  <Link to="/register" className="btn btn-light btn-lg me-3">
                    <i className="bi bi-person-plus me-2"></i>
                    Get Started
                  </Link>
                  <Link to="/login" className="btn btn-outline-light btn-lg">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Welcome Message for Logged In Users */}
        {isAuthenticated && (
          <div className="modern-card bg-gradient-primary text-white mb-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h3 className="mb-2">
                  <i className="bi bi-check-circle me-2"></i>
                  Welcome back, {user?.username || user?.email}!
                </h3>
                <p className="mb-0">Continue managing your farms and carbon credits.</p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <Link to="/dashboard" className="btn btn-light">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <h2 className="text-gradient mb-2">Platform Features</h2>
            <p className="text-muted">Explore all the powerful features of our platform</p>
          </div>
          
          <div className="grid-modern">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                {isAuthenticated ? (
                  <Link 
                    to={feature.link} 
                    className={`btn btn-outline-${feature.color} mt-3`}
                  >
                    Explore <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                ) : (
                  <Link 
                    to="/register" 
                    className={`btn btn-outline-${feature.color} mt-3`}
                  >
                    Get Started <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions for Logged In Users */}
        {isAuthenticated && (
          <div className="modern-card">
            <h3 className="mb-4">
              <i className="bi bi-lightning-charge me-2 text-warning"></i>
              Quick Actions
            </h3>
            <div className="row g-3">
              <div className="col-md-4">
                <Link to="/farm-registration" className="btn btn-success w-100">
                  <i className="bi bi-plus-circle me-2"></i>
                  Register New Farm
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/carbon-credits" className="btn btn-primary w-100">
                  <i className="bi bi-credit-card me-2"></i>
                  Generate Credits
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/ai-recommendations" className="btn btn-info w-100">
                  <i className="bi bi-robot me-2"></i>
                  Get Recommendations
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* About Section */}
        <div className="modern-card mt-5">
          <div className="row">
            <div className="col-md-6">
              <h3 className="mb-3">
                <i className="bi bi-info-circle me-2 text-primary"></i>
                About EBD Platform
              </h3>
              <p className="text-muted">
                The Environmental Benefits Dashboard helps farmers track their carbon emissions, 
                receive AI-powered recommendations for sustainable practices, and generate carbon 
                credits that can be sold to companies looking to offset their environmental impact.
              </p>
            </div>
            <div className="col-md-6">
              <h3 className="mb-3">
                <i className="bi bi-shield-check me-2 text-success"></i>
                Key Benefits
              </h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Track emissions in real-time
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Get personalized recommendations
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Generate verifiable carbon credits
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Connect with credit buyers
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-muted mt-5 mb-4">
          <p className="mb-1">
            <strong>EBD Project - Environmental Benefits Dashboard</strong>
          </p>
          <p className="mb-0 small">Academic Year 2023-2024</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
