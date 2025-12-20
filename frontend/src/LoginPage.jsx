import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="modern-card shadow-modern">
              <div className="text-center mb-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                <h2 className="text-gradient mb-2">Welcome Back</h2>
                <p className="text-muted">Sign in to your account to continue</p>
              </div>
              
              {error && (
                <div className="alert-modern alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group-modern">
                  <label htmlFor="email" className="form-label-modern">
                    <i className="bi bi-envelope me-2"></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control-modern"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="form-group-modern">
                  <label htmlFor="password" className="form-label-modern">
                    <i className="bi bi-lock me-2"></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control-modern"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                  style={{ padding: '0.875rem', fontSize: '1rem' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Sign In
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0 text-muted">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary fw-bold text-decoration-none">
                    Create one here
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-3 rounded-modern" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                <h6 className="mb-2">
                  <i className="bi bi-shield-check me-2 text-primary"></i>
                  Secure Authentication
                </h6>
                <ul className="small mb-0 text-muted" style={{ listStyle: 'none', padding: 0 }}>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>JWT token authentication</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Password hashing with bcrypt</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>MongoDB user validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
