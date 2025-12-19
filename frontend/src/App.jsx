import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Homepage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <a href="/" className="navbar-brand">🔐 AgriCarbon Auth</a>
            <div className="navbar-links">
              <a href="/" className="nav-link">Home</a>
              <a href="/dashboard" className="nav-link">Dashboard</a>
              <a href="/login" className="nav-link">Login</a>
              <a href="/register" className="nav-link">Register</a>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;