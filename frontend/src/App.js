import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Import your components
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PurchaseRequest from './pages/PurchaseRequest';
import PurchaseRequestsList from './pages/PurchaseRequestsList';
import AdminDashboard from './pages/AdminDashboard';
import Credits from './pages/Credits';
import Transactions from './pages/Transactions';
import Recommendations from './pages/Recommendations';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/purchase-request" element={
              <ProtectedRoute requiredRole="student">
                <PurchaseRequest />
              </ProtectedRoute>
            } />
            
            <Route path="/my-purchases" element={
              <ProtectedRoute requiredRole="student">
                <PurchaseRequestsList />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/purchases" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/credits" element={
              <ProtectedRoute>
                <Credits />
              </ProtectedRoute>
            } />
            
            <Route path="/transactions" element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            } />
            
            <Route path="/recommendations" element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            } />
            
            {/* Default route */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;