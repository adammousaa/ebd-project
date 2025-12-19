import React, { useState } from 'react';
import './index.css';

function PurchaseRequestsPage() {
  // Available carbon credits for purchase
  const [availableCredits, setAvailableCredits] = useState([
    { id: 1, farmId: 'FARM001', farmName: 'Green Valley Farm', credits: 25, pricePerCredit: 45.00, location: 'California, USA', certification: 'Verified' },
    { id: 2, farmId: 'FARM002', farmName: 'Sunshine Organics', credits: 18, pricePerCredit: 42.50, location: 'Texas, USA', certification: 'Gold Standard' },
    { id: 3, farmId: 'FARM003', farmName: 'Riverbend Ranch', credits: 32, pricePerCredit: 48.75, location: 'Oregon, USA', certification: 'Verified' },
    { id: 4, farmId: 'FARM004', farmName: 'Mountain View Farm', credits: 12, pricePerCredit: 40.00, location: 'Colorado, USA', certification: 'Basic' },
  ]);

  // Purchase request form state
  const [purchaseForm, setPurchaseForm] = useState({
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    requestedCredits: '',
    selectedFarmId: '',
    purpose: 'offset', // offset, investment, esg, other
    notes: ''
  });

  // Submitted requests
  const [submittedRequests, setSubmittedRequests] = useState([
    { id: 1001, companyName: 'EcoCorp Inc.', credits: 15, farmId: 'FARM001', status: 'approved', date: '2025-12-15', totalAmount: 675.00 },
    { id: 1002, companyName: 'GreenTech Solutions', credits: 8, farmId: 'FARM002', status: 'pending', date: '2025-12-18', totalAmount: 340.00 },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseForm(prev => ({
      ...prev,
      [name]: value
    }));

    // If farm selection changes, calculate total
    if (name === 'selectedFarmId' && value) {
      const selected = availableCredits.find(c => c.farmId === value);
      setSelectedCredit(selected);
    }
  };

  // Handle credit selection
  const handleCreditSelect = (credit) => {
    setSelectedCredit(credit);
    setPurchaseForm(prev => ({
      ...prev,
      selectedFarmId: credit.farmId,
      requestedCredits: ''
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedCredit || !purchaseForm.requestedCredits) return 0;
    const credits = parseInt(purchaseForm.requestedCredits) || 0;
    return credits * selectedCredit.pricePerCredit;
  };

  // Validate requested credits don't exceed available
  const validateCredits = () => {
    if (!selectedCredit || !purchaseForm.requestedCredits) return true;
    const requested = parseInt(purchaseForm.requestedCredits);
    return requested <= selectedCredit.credits;
  };

  // Submit purchase request
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!validateCredits()) {
      alert(`❌ Cannot request more credits than available (${selectedCredit.credits} credits available)`);
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newRequest = {
        id: Date.now(),
        companyName: purchaseForm.companyName,
        credits: parseInt(purchaseForm.requestedCredits),
        farmId: purchaseForm.selectedFarmId,
        farmName: selectedCredit?.farmName || 'Unknown Farm',
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        totalAmount: calculateTotal(),
        purpose: purchaseForm.purpose,
        notes: purchaseForm.notes
      };

      // Add to submitted requests
      setSubmittedRequests(prev => [newRequest, ...prev]);

      // Update available credits
      if (selectedCredit) {
        setAvailableCredits(prev => 
          prev.map(credit => 
            credit.id === selectedCredit.id 
              ? { ...credit, credits: credit.credits - newRequest.credits }
              : credit
          )
        );
      }

      // Show success message
      alert(`✅ Purchase request submitted!\n\nRequest ID: ${newRequest.id}\nStatus: Pending Review\nTotal: $${newRequest.totalAmount.toFixed(2)}`);

      // Reset form
      setPurchaseForm({
        companyName: '',
        contactEmail: '',
        contactPhone: '',
        requestedCredits: '',
        selectedFarmId: '',
        purpose: 'offset',
        notes: ''
      });
      setSelectedCredit(null);
      setIsSubmitting(false);
    }, 1500);
  };

  // Update request status (mock admin action)
  const updateRequestStatus = (requestId, newStatus) => {
    setSubmittedRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
    
    const statusMessages = {
      'approved': '✅ Request approved!',
      'rejected': '❌ Request rejected.',
      'completed': '🏁 Purchase completed.'
    };
    
    alert(statusMessages[newStatus] || 'Status updated');
  };

  return (
    <div className="purchase-requests-page">
      {/* Header */}
      <div className="purchase-header">
        <h1>🌍 Carbon Credit Marketplace</h1>
        <p>Feature 6: Company purchase page + request handling</p>
        <p className="subtitle">Purchase carbon credits directly from verified farms</p>
      </div>

      <div className="purchase-container">
        {/* Available Credits Marketplace */}
        <div className="marketplace-section">
          <h2>Available Carbon Credits</h2>
          <p className="section-description">Browse and select credits from verified sustainable farms</p>
          
          <div className="credits-grid">
            {availableCredits.map(credit => (
              <div 
                key={credit.id} 
                className={`credit-card ${selectedCredit?.id === credit.id ? 'selected' : ''}`}
                onClick={() => handleCreditSelect(credit)}
              >
                <div className="credit-card-header">
                  <h3>{credit.farmName}</h3>
                  <span className={`certification-badge ${credit.certification.toLowerCase().replace(' ', '-')}`}>
                    {credit.certification}
                  </span>
                </div>
                
                <div className="credit-card-details">
                  <div className="detail-item">
                    <span className="label">Available Credits:</span>
                    <span className="value">{credit.credits} tons CO₂</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Price:</span>
                    <span className="value price">${credit.pricePerCredit.toFixed(2)}/credit</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Location:</span>
                    <span className="value">{credit.location}</span>
                  </div>
                  
                  <div className="detail-item">
                    <span className="label">Farm ID:</span>
                    <span className="value farm-id">{credit.farmId}</span>
                  </div>
                </div>
                
                <div className="credit-card-footer">
                  <div className="total-value">
                    Total Value: <strong>${(credit.credits * credit.pricePerCredit).toFixed(2)}</strong>
                  </div>
                  <button 
                    className="select-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreditSelect(credit);
                    }}
                  >
                    {selectedCredit?.id === credit.id ? '✓ Selected' : 'Select'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Request Form */}
        <div className="purchase-form-section">
          <div className="form-container">
            <h2>Submit Purchase Request</h2>
            
            {selectedCredit && (
              <div className="selected-credit-info">
                <h3>Selected: {selectedCredit.farmName}</h3>
                <p>Available: {selectedCredit.credits} credits @ ${selectedCredit.pricePerCredit.toFixed(2)} each</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={purchaseForm.companyName}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactEmail">Contact Email *</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={purchaseForm.contactEmail}
                    onChange={handleInputChange}
                    placeholder="contact@company.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contactPhone">Contact Phone</label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={purchaseForm.contactPhone}
                    onChange={handleInputChange}
                    placeholder="+1 (123) 456-7890"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="requestedCredits">Credits to Purchase *</label>
                  <input
                    type="number"
                    id="requestedCredits"
                    name="requestedCredits"
                    value={purchaseForm.requestedCredits}
                    onChange={handleInputChange}
                    placeholder="Number of credits"
                    min="1"
                    max={selectedCredit?.credits || 100}
                    required
                    disabled={!selectedCredit}
                  />
                  {selectedCredit && (
                    <small className="hint">
                      Max: {selectedCredit.credits} credits available
                    </small>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="purpose">Purchase Purpose *</label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={purchaseForm.purpose}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="offset">Carbon Offset</option>
                    <option value="esg">ESG Compliance</option>
                    <option value="investment">Investment</option>
                    <option value="csr">CSR Initiative</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="selectedFarmId">Selected Farm *</label>
                  <select
                    id="selectedFarmId"
                    name="selectedFarmId"
                    value={purchaseForm.selectedFarmId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a farm</option>
                    {availableCredits.map(credit => (
                      <option key={credit.id} value={credit.farmId}>
                        {credit.farmName} ({credit.credits} credits available)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Additional Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={purchaseForm.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requirements or comments..."
                  rows="3"
                />
              </div>

              {/* Price Summary */}
              {purchaseForm.requestedCredits && selectedCredit && (
                <div className="price-summary">
                  <h4>Price Summary</h4>
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>{purchaseForm.requestedCredits} credits × ${selectedCredit.pricePerCredit.toFixed(2)}</span>
                      <span>${(selectedCredit.pricePerCredit * purchaseForm.requestedCredits).toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total Amount</span>
                      <span className="total-amount">${calculateTotal().toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <div className="form-notice">
                  <p>📋 <strong>Note:</strong> This is a purchase request. Actual transaction will be completed after approval.</p>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || !selectedCredit || !purchaseForm.requestedCredits}
                  className="submit-purchase-btn"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Purchase Request'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Submitted Requests */}
        <div className="requests-history">
          <h2>Purchase Requests History</h2>
          
          {submittedRequests.length > 0 ? (
            <div className="requests-table">
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Company</th>
                    <th>Credits</th>
                    <th>Farm</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedRequests.map(request => (
                    <tr key={request.id}>
                      <td><code>REQ{request.id.toString().slice(-4)}</code></td>
                      <td>{request.companyName}</td>
                      <td>{request.credits} credits</td>
                      <td>{request.farmName}</td>
                      <td className="amount">${request.totalAmount.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${request.status}`}>
                          {request.status}
                        </span>
                      </td>
                      <td>{request.date}</td>
                      <td className="actions">
                        {request.status === 'pending' && (
                          <>
                            <button 
                              className="action-btn approve"
                              onClick={() => updateRequestStatus(request.id, 'approved')}
                            >
                              Approve
                            </button>
                            <button 
                              className="action-btn reject"
                              onClick={() => updateRequestStatus(request.id, 'rejected')}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {request.status === 'approved' && (
                          <button 
                            className="action-btn complete"
                            onClick={() => updateRequestStatus(request.id, 'completed')}
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-requests">
              <p>No purchase requests yet. Submit your first request above!</p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="marketplace-info">
          <h3>💼 How Carbon Credit Purchases Work</h3>
          <div className="info-content">
            <div className="info-item">
              <h4>1. Browse Credits</h4>
              <p>Select from verified farms with different certifications and prices.</p>
            </div>
            <div className="info-item">
              <h4>2. Submit Request</h4>
              <p>Enter company details and credit quantity. Request goes for approval.</p>
            </div>
            <div className="info-item">
              <h4>3. Approval & Payment</h4>
              <p>After approval, complete payment to finalize the purchase.</p>
            </div>
            <div className="info-item">
              <h4>4. Receive Certificate</h4>
              <p>Get a digital certificate proving your carbon offset.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseRequestsPage;