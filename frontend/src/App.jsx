import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all existing pages
import HomePage from "./Homepage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import DashboardPage from "./DashboardPage";
import EmissionDashboardPage from "./EmissionDashboardPage";
import CarbonCreditPage from "./CarbonCreditPage";
import FarmRegistrationPage from "./FarmRegistrationPage";

// Import purchase request pages
import PurchaseRequestsPage from "./PurchaseRequestsPage";
import CreatePurchaseRequest from "./CreatePurchaseRequest";
import MyPurchaseRequests from "./MyPurchaseRequests";
import AdminDashboard from "./AdminDashboard";
import AdminPurchaseRequests from "./AdminPurchaseRequests";

// Import components
import Navbar from "./components/Navbar";
import AIRecommendationsPage from "./pages/AIRecommendationsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
          <Navbar />
          
          <main style={{ paddingBottom: '3rem' }}>
            <Routes>
              {/* ===== PUBLIC ROUTES ===== */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* ===== PROTECTED ROUTES ===== */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />

              <Route path="/farm-registration" element={
                <ProtectedRoute>
                  <FarmRegistrationPage />
                </ProtectedRoute>
              } />

              <Route path="/ai-recommendations" element={
                <ProtectedRoute>
                  <AIRecommendationsPage />
                </ProtectedRoute>
              } />

              <Route path="/emission-dashboard" element={
                <ProtectedRoute>
                  <EmissionDashboardPage />
                </ProtectedRoute>
              } />

              <Route path="/carbon-credits" element={
                <ProtectedRoute>
                  <CarbonCreditPage />
                </ProtectedRoute>
              } />

              {/* ===== PURCHASE REQUESTS ===== */}
              <Route path="/purchase-requests" element={
                <ProtectedRoute requiredRole="student">
                  <PurchaseRequestsPage />
                </ProtectedRoute>
              } />

              <Route path="/create-purchase-request" element={
                <ProtectedRoute requiredRole="student">
                  <CreatePurchaseRequest />
                </ProtectedRoute>
              } />

              <Route path="/my-purchase-requests" element={
                <ProtectedRoute requiredRole="student">
                  <MyPurchaseRequests />
                </ProtectedRoute>
              } />

              {/* ===== ADMIN ROUTES ===== */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/admin/purchase-requests" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPurchaseRequests />
                </ProtectedRoute>
              } />

              {/* ===== FALLBACK ROUTE ===== */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;