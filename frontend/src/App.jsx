import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import DashboardPage from "./DashboardPage";
import AIRecommendationsPage from "./pages/AIRecommendationsPage";
import EmissionDashboardPage from "./EmissionDashboardPage";
import CarbonCreditPage from "./CarbonCreditPage";
import FarmRegistrationPage from "./FarmRegistrationPage";
import PurchaseRequestsPage from "./PurchaseRequestsPage"; // ADD THIS IMPORT

function App() {
  return (
    <Router>
      <div className="App">

        {/* ===== NAVBAR (All team features preserved) ===== */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-brand">
              🌱 AgriCarbon Platform
            </Link>

            <div className="navbar-links">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>

              {/* Feature 2 */}
              <Link to="/farm-registration" className="nav-link">
                Register Farm
              </Link>

              {/* Feature 3 */}
              <Link to="/ai-recommendations" className="nav-link">
                AI Recommendations
              </Link>

              {/* Feature 4 */}
              <Link to="/emission-dashboard" className="nav-link">
                Emission Tracking
              </Link>

              {/* Feature 5 */}
              <Link to="/carbon-credits" className="nav-link">
                Carbon Credits
              </Link>

              {/* FEATURE 6: ADD THIS NAV LINK */}
              <Link to="/purchase-requests" className="nav-link">
                Purchase Credits
              </Link>
            </div>
          </div>
        </nav>

        {/* ===== ROUTES ===== */}
        <div className="container">
          <Routes>
            {/* Feature 1 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Feature 2 – Farm Registration */}
            <Route
              path="/farm-registration"
              element={<FarmRegistrationPage />}
            />

            {/* Feature 3 – AI Recommendations */}
            <Route
              path="/ai-recommendations"
              element={<AIRecommendationsPage />}
            />

            {/* Feature 4 */}
            <Route
              path="/emission-dashboard"
              element={<EmissionDashboardPage />}
            />

            {/* Feature 5 */}
            <Route
              path="/carbon-credits"
              element={<CarbonCreditPage />}
            />

            {/* FEATURE 6: ADD THIS ROUTE */}
            <Route
              path="/purchase-requests"
              element={<PurchaseRequestsPage />}
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;