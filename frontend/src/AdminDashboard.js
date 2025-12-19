import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // Mock data - replace with API call
    setStats({
      totalUsers: 124,
      pendingRequests: 8,
      approvedRequests: 45,
      totalRevenue: 12500
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <p className="text-muted">System administration and management</p>
      
      {/* Stats Cards */}
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">Pending Requests</h5>
              <h2>{stats.pendingRequests}</h2>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Approved Requests</h5>
              <h2>{stats.approvedRequests}</h2>
            </div>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <h2>${stats.totalRevenue.toLocaleString()}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mt-4">
        <div className="card-header">
          <h5>Quick Actions</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <a href="/admin/purchase-requests" className="btn btn-outline-primary w-100">
                Manage Purchase Requests
              </a>
            </div>
            <div className="col-md-4 mb-3">
              <button className="btn btn-outline-success w-100">
                User Management
              </button>
            </div>
            <div className="col-md-4 mb-3">
              <button className="btn btn-outline-info w-100">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;