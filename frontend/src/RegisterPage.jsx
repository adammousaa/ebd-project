import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await register(userData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-7">
            <div className="modern-card shadow-modern">
              <div className="text-center mb-4">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                <h2 className="text-gradient mb-2">Create Your Account</h2>
                <p className="text-muted">Join our platform and start managing your carbon credits</p>
              </div>
              
              {error && (
                <div className="alert-modern alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group-modern">
                      <label htmlFor="username" className="form-label-modern">
                        <i className="bi bi-person me-2"></i>
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control-modern"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="johndoe"
                        required
                        minLength={3}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
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
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group-modern">
                  <label htmlFor="role" className="form-label-modern">
                    <i className="bi bi-person-badge me-2"></i>
                    Account Type
                  </label>
                  <select
                    className="form-control-modern"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="student">🎓 Student</option>
                    <option value="admin">👑 Admin</option>
                    <option value="company">🏢 Company</option>
                  </select>
                </div>
                
                <div className="row">
                  <div className="col-md-6">
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
                        placeholder="Minimum 6 characters"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group-modern">
                      <label htmlFor="confirmPassword" className="form-label-modern">
                        <i className="bi bi-lock-fill me-2"></i>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control-modern"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-success w-100 mb-3"
                  disabled={loading}
                  style={{ padding: '0.875rem', fontSize: '1rem' }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Create Account
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="mb-0 text-muted">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary fw-bold text-decoration-none">
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-3 rounded-modern" style={{ background: '#f0f9ff', border: '1px solid #bae6fd' }}>
                <h6 className="mb-2">
                  <i className="bi bi-shield-check me-2 text-primary"></i>
                  Security Features
                </h6>
                <ul className="small mb-0 text-muted" style={{ listStyle: 'none', padding: 0 }}>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Password hashing with bcrypt</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>JWT tokens for authentication</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Email validation & duplicate checking</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>MongoDB schema validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
