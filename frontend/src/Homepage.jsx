import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">🔐 User Authentication System</h1>
        <p className="lead">
          <strong>Student 1:</strong> Registration, Login, JWT, Password Hashing
        </p>
      </div>

      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Milestone 2: Static Frontend Only</h3>
        </div>
        <div className="card-body">
          <p>This demonstrates the UI components for User Authentication:</p>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Registration Form</h5>
                  <p className="card-text">User sign-up interface with validation</p>
                  <ul>
                    <li>Username/Email input</li>
                    <li>Password requirements</li>
                    <li>Role selection</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Login Form</h5>
                  <p className="card-text">User authentication interface</p>
                  <ul>
                    <li>Credentials input</li>
                    <li>Remember me option</li>
                    <li>Forgot password link</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="alert alert-info mt-4">
            <h5>Important Notes:</h5>
            <p className="mb-1">
              <strong>Current Status:</strong> All data is static/hard-coded for Milestone 2
            </p>
            <p className="mb-0">
              <strong>Milestone 3:</strong> Will connect to backend API with JWT & password hashing
            </p>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="mb-0">Quick Navigation</h3>
        </div>
        <div className="card-body text-center">
          <div className="row">
            <div className="col-md-4 mb-3">
              <Link 
                to="/login" 
                className="btn btn-primary btn-lg w-100 py-3"
                style={{ fontSize: '1.1rem' }}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login Page
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link 
                to="/register" 
                className="btn btn-success btn-lg w-100 py-3"
                style={{ fontSize: '1.1rem' }}
              >
                <i className="bi bi-person-plus me-2"></i>
                Register Page
              </Link>
            </div>
            <div className="col-md-4 mb-3">
              <Link 
                to="/dashboard" 
                className="btn btn-warning btn-lg w-100 py-3"
                style={{ fontSize: '1.1rem' }}
              >
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard
              </Link>
            </div>
          </div>
          
          <div className="row mt-4">
            <div className="col-12">
              <h5>Other Features:</h5>
              <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
                <Link to="/farm-registration" className="btn btn-outline-primary">
                  Farm Registration
                </Link>
                <Link to="/ai-recommendations" className="btn btn-outline-success">
                  AI Recommendations
                </Link>
                <Link to="/emission-dashboard" className="btn btn-outline-warning">
                  Emission Tracking
                </Link>
                <Link to="/carbon-credits" className="btn btn-outline-info">
                  Carbon Credits
                </Link>
                <Link to="/purchase-requests" className="btn btn-outline-danger">
                  Purchase Requests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center text-muted">
        <p className="mb-1">
          <strong>EBD Project - Environmental Benefits Dashboard</strong>
        </p>
        <p className="mb-0">Academic Year 2023-2024</p>
      </div>
    </div>
  );
};

export default HomePage;