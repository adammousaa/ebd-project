import React, { useState } from "react";

const AdminPurchaseRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, user: "John Doe", item: "Laptop", quantity: 5, amount: 2500, status: "Pending", date: "2025-12-18" },
    { id: 2, user: "Jane Smith", item: "Projector", quantity: 2, amount: 800, status: "Pending", date: "2025-12-17" },
    { id: 3, user: "Bob Johnson", item: "Desk Chairs", quantity: 10, amount: 1500, status: "Approved", date: "2025-12-15" },
    { id: 4, user: "Alice Brown", item: "Whiteboard", quantity: 3, amount: 300, status: "Rejected", date: "2025-12-14" },
    { id: 5, user: "Charlie Wilson", item: "Software License", quantity: 1, amount: 500, status: "Pending", date: "2025-12-19" },
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Approved" } : req
    ));
    alert(`Request #${id} approved!`);
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Rejected" } : req
    ));
    alert(`Request #${id} rejected.`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      "Pending": "bg-warning text-dark",
      "Approved": "bg-success",
      "Rejected": "bg-danger"
    };
    return `badge ${badges[status] || "bg-secondary"}`;
  };

  const pendingRequests = requests.filter(req => req.status === "Pending");

  return (
    <div className="container mt-4">
      <h2>Admin - Purchase Requests Management</h2>
      <p className="text-muted">Review and manage purchase requests from users</p>

      {/* Stats Summary */}
      <div className="row mt-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Requests</h5>
              <h2>{requests.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <h2>{pendingRequests.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Approved</h5>
              <h2>{requests.filter(r => r.status === "Approved").length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Rejected</h5>
              <h2>{requests.filter(r => r.status === "Rejected").length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests Section */}
      <div className="card mt-4">
        <div className="card-header bg-warning text-dark">
          <h5 className="mb-0">Pending Approval ({pendingRequests.length})</h5>
        </div>
        <div className="card-body">
          {pendingRequests.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>User</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map(req => (
                    <tr key={req.id}>
                      <td><strong>#{req.id}</strong></td>
                      <td>{req.user}</td>
                      <td>{req.item}</td>
                      <td>{req.quantity}</td>
                      <td>${req.amount.toLocaleString()}</td>
                      <td>{req.date}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-sm btn-success"
                            onClick={() => handleApprove(req.id)}
                          >
                            ✓ Approve
                          </button>
                          <button 
                            className="btn btn-sm btn-danger ms-1"
                            onClick={() => handleReject(req.id)}
                          >
                            ✗ Reject
                          </button>
                          <button className="btn btn-sm btn-outline-primary ms-1">
                            View Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-success">
              <h5>All caught up!</h5>
              <p>No pending purchase requests at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* All Requests Table */}
      <div className="card mt-4">
        <div className="card-header">
          <h5 className="mb-0">All Purchase Requests</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id}>
                    <td>#{req.id}</td>
                    <td>{req.user}</td>
                    <td>{req.item}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(req.status)} p-2`}>
                        {req.status}
                      </span>
                    </td>
                    <td>${req.amount.toLocaleString()}</td>
                    <td>{req.date}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-primary">
          Export to Excel
        </button>
        <button className="btn btn-outline-secondary">
          Print Report
        </button>
        <button className="btn btn-outline-info ms-auto">
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default AdminPurchaseRequests;