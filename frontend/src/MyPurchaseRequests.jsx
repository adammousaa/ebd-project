import React from "react";
import { Link } from "react-router-dom";

const MyPurchaseRequests = () => {
  // Mock data - replace with API call later
  const requests = [
    { id: 1, item: "Laptop", quantity: 5, status: "Pending", date: "2025-12-18", total: 2500 },
    { id: 2, item: "Projector", quantity: 2, status: "Approved", date: "2025-12-15", total: 800 },
    { id: 3, item: "Whiteboard", quantity: 3, status: "Rejected", date: "2025-12-10", total: 300 },
    { id: 4, item: "Office Chairs", quantity: 10, status: "Pending", date: "2025-12-19", total: 1500 },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      "Pending": "bg-warning text-dark",
      "Approved": "bg-success",
      "Rejected": "bg-danger",
      "Completed": "bg-info"
    };
    return `badge ${badges[status] || "bg-secondary"}`;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>My Purchase Requests</h2>
          <p className="text-muted">Track the status of your submitted purchase requests</p>
        </div>
        <Link to="/create-purchase-request" className="btn btn-primary">
          + Create New Request
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Request ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Date Submitted</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td><strong>#{req.id}</strong></td>
                <td>{req.item}</td>
                <td>{req.quantity}</td>
                <td>{req.date}</td>
                <td>${req.total.toLocaleString()}</td>
                <td>
                  <span className={`badge ${getStatusBadge(req.status)} p-2`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button className="btn btn-sm btn-outline-primary">
                      <i className="bi bi-eye"></i> View
                    </button>
                    {req.status === "Pending" && (
                      <>
                        <button className="btn btn-sm btn-outline-warning ms-1">
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger ms-1">
                          <i className="bi bi-trash"></i> Cancel
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Requests</h5>
              <h2>{requests.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Approved</h5>
              <h2>{requests.filter(r => r.status === "Approved").length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <h2>{requests.filter(r => r.status === "Pending").length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Rejected</h5>
              <h2>{requests.filter(r => r.status === "Rejected").length}</h2>
            </div>
          </div>
        </div>
      </div>

      {requests.length === 0 && (
        <div className="alert alert-info mt-4 text-center">
          <h5>No purchase requests found</h5>
          <p>You haven't submitted any purchase requests yet.</p>
          <Link to="/create-purchase-request" className="btn btn-primary btn-lg">
            <i className="bi bi-plus-circle"></i> Create Your First Request
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyPurchaseRequests;