import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePurchaseRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 1,
    reason: '',
    urgency: 'normal',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to submit purchase request
    console.log('Form submitted:', formData);
    alert('Purchase request submitted successfully!');
    navigate('/my-purchase-requests');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mt-4">
      <h2>Create Purchase Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Reason for Purchase</label>
          <textarea
            className="form-control"
            name="reason"
            rows="3"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Urgency</label>
          <select
            className="form-select"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
        <button 
          type="button" 
          className="btn btn-secondary ms-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreatePurchaseRequest;