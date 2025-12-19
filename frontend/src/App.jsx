import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import EmissionDashboardPage from './EmissionDashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar is here in App.jsx (not separate component) */}
        <nav className="navbar">
          <div className="navbar-container">
            <a href="/" className="navbar-brand">🌱 AgriCarbon Platform</a>
            <div className="navbar-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/dashboard" className="nav-link">Dashboard</a>
              <a href="/login" className="nav-link">Login</a>
              <a href="/register" className="nav-link">Register</a>
              {/* ADD THIS LINE FOR FEATURE 4: */}
              <a href="/emission-dashboard" className="nav-link">Emission Tracking</a>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            {/* Feature 1 Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Feature 4 Route */}
            <Route path="/emission-dashboard" element={<EmissionDashboardPage />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;