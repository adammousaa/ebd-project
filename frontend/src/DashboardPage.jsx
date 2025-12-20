import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  const quickActions = [
    {
      icon: "🌱",
      title: "Register Farm",
      description: "Add a new farm to track",
      link: "/farm-registration",
      color: "success"
    },
    {
      icon: "💳",
      title: "Generate Credits",
      description: "Create carbon credits",
      link: "/carbon-credits",
      color: "primary"
    },
    {
      icon: "🤖",
      title: "AI Recommendations",
      description: "Get sustainability tips",
      link: "/ai-recommendations",
      color: "info"
    },
    {
      icon: "📊",
      title: "View Emissions",
      description: "Track your carbon footprint",
      link: "/emission-dashboard",
      color: "warning"
    }
  ];

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-modern"></div>
        <p className="text-muted mt-3">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-speedometer2 me-3"></i>
            Dashboard
          </h1>
          <p className="page-subtitle">
            Welcome back, {user?.username || user?.email || 'User'}!
          </p>
        </div>
      </div>

      <div className="container">
        {/* User Info Card */}
        <div className="modern-card">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3 className="mb-3">
                <i className="bi bi-person-circle me-2 text-primary"></i>
                Account Information
              </h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-person me-2 text-muted"></i>
                    <div>
                      <small className="text-muted d-block">Username</small>
                      <strong>{user?.username || 'N/A'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-envelope me-2 text-muted"></i>
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <strong>{user?.email || 'N/A'}</strong>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-shield-check me-2 text-muted"></i>
                    <div>
                      <small className="text-muted d-block">Role</small>
                      <span className={`badge bg-${user?.role === 'admin' ? 'danger' : user?.role === 'student' ? 'primary' : 'success'}`}>
                        {user?.role || 'student'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-check-circle me-2 text-muted"></i>
                    <div>
                      <small className="text-muted d-block">Status</small>
                      <span className="badge bg-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center mt-4 mt-md-0">
              <div className="stat-card">
                <div className="stat-label">Account Type</div>
                <div className="stat-value" style={{ fontSize: '1.5rem' }}>
                  {user?.role === 'admin' ? '👑 Admin' : user?.role === 'student' ? '🎓 Student' : '🏢 Company'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="modern-card">
          <h3 className="mb-4">
            <i className="bi bi-lightning-charge me-2 text-warning"></i>
            Quick Actions
          </h3>
          <div className="grid-modern grid-2">
            {quickActions.map((action, index) => (
              <Link 
                key={index} 
                to={action.link}
                className="feature-card text-decoration-none"
                style={{ color: 'inherit' }}
              >
                <div className="feature-icon">{action.icon}</div>
                <h4 className="feature-title">{action.title}</h4>
                <p className="feature-description">{action.description}</p>
                <span className={`btn btn-outline-${action.color} mt-2`}>
                  Go <i className="bi bi-arrow-right ms-1"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Feature Links */}
        <div className="modern-card">
          <h3 className="mb-4">
            <i className="bi bi-grid me-2 text-primary"></i>
            All Features
          </h3>
          <div className="row g-3">
            <div className="col-md-6 col-lg-3">
              <Link to="/farm-registration" className="btn btn-outline-success w-100">
                <i className="bi bi-house-door me-2"></i>
                Farm Registration
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link to="/ai-recommendations" className="btn btn-outline-info w-100">
                <i className="bi bi-robot me-2"></i>
                AI Recommendations
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link to="/emission-dashboard" className="btn btn-outline-warning w-100">
                <i className="bi bi-graph-up me-2"></i>
                Emission Dashboard
              </Link>
            </div>
            <div className="col-md-6 col-lg-3">
              <Link to="/carbon-credits" className="btn btn-outline-primary w-100">
                <i className="bi bi-credit-card me-2"></i>
                Carbon Credits
              </Link>
            </div>
            {user?.role === 'student' && (
              <>
                <div className="col-md-6 col-lg-3">
                  <Link to="/purchase-requests" className="btn btn-outline-danger w-100">
                    <i className="bi bi-cart me-2"></i>
                    Purchase Requests
                  </Link>
                </div>
                <div className="col-md-6 col-lg-3">
                  <Link to="/my-purchase-requests" className="btn btn-outline-secondary w-100">
                    <i className="bi bi-inbox me-2"></i>
                    My Requests
                  </Link>
                </div>
              </>
            )}
            {user?.role === 'admin' && (
              <div className="col-md-6 col-lg-3">
                <Link to="/admin" className="btn btn-outline-danger w-100">
                  <i className="bi bi-shield-check me-2"></i>
                  Admin Panel
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
