import React, { useState, useEffect } from 'react';
import './index.css';

function CarbonCreditPage() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCredits();
  }, []);

  const [formData, setFormData] = useState({
    farmId: '',
    baselineEmission: '',
    actualEmission: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { creditAPI } = await import('./services/api');
      const response = await creditAPI.generateCredits({
        farmId: formData.farmId,
        baselineEmission: Number(formData.baselineEmission),
        actualEmission: Number(formData.actualEmission)
      });

      if (response.data.success) {
        alert(`✅ Credits Generated: ${response.data.credit.creditsGenerated} credits`);
        
        setFormData({
          farmId: '',
          baselineEmission: '',
          actualEmission: ''
        });

        loadCredits();
      }
    } catch (err) {
      console.error("Error generating credits:", err);
      const errorMsg = err.response?.data?.message || err.message || "Error generating credits";
      alert(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const loadCredits = async () => {
    try {
      const { creditAPI } = await import('./services/api');
      const response = await creditAPI.getAllCredits();
      setCredits(response.data.data || []);
    } catch (err) {
      console.error("Error loading credits:", err);
      alert("Error loading credits: " + (err.response?.data?.message || err.message));
    }
  };

  const calculateReduction = (baseline, actual) => {
    if (!baseline || baseline === 0) return 0;
    return ((baseline - actual) / baseline * 100).toFixed(1);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-credit-card me-3"></i>
            Carbon Credit Generation
          </h1>
          <p className="page-subtitle">
            Convert emission reductions into verifiable carbon credits
          </p>
        </div>
      </div>

      <div className="container">
        {/* Generate Form */}
        <div className="modern-card mb-4">
          <h3 className="mb-4">
            <i className="bi bi-plus-circle me-2 text-success"></i>
            Generate New Credits
          </h3>
          <form onSubmit={handleGenerate}>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-group-modern">
                  <label htmlFor="farmId" className="form-label-modern">
                    <i className="bi bi-house-door me-2"></i>
                    Farm ID
                  </label>
                  <input 
                    type="text" 
                    className="form-control-modern"
                    id="farmId" 
                    placeholder="Enter Farm ID" 
                    value={formData.farmId}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group-modern">
                  <label htmlFor="baselineEmission" className="form-label-modern">
                    <i className="bi bi-graph-up me-2"></i>
                    Baseline Emission (tons)
                  </label>
                  <input 
                    type="number" 
                    className="form-control-modern"
                    id="baselineEmission" 
                    placeholder="Baseline emission" 
                    value={formData.baselineEmission}
                    onChange={handleInputChange}
                    required 
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group-modern">
                  <label htmlFor="actualEmission" className="form-label-modern">
                    <i className="bi bi-graph-down me-2"></i>
                    Actual Emission (tons)
                  </label>
                  <input 
                    type="number" 
                    className="form-control-modern"
                    id="actualEmission" 
                    placeholder="Actual emission" 
                    value={formData.actualEmission}
                    onChange={handleInputChange}
                    required 
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {formData.baselineEmission && formData.actualEmission && 
             parseFloat(formData.baselineEmission) > parseFloat(formData.actualEmission) && (
              <div className="alert-modern alert-success mt-3">
                <i className="bi bi-check-circle me-2"></i>
                Estimated Credits: <strong>
                  {((parseFloat(formData.baselineEmission) - parseFloat(formData.actualEmission)) / 1000).toFixed(2)} credits
                </strong>
                {' '}({calculateReduction(parseFloat(formData.baselineEmission), parseFloat(formData.actualEmission))}% reduction)
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-success mt-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Generating...
                </>
              ) : (
                <>
                  <i className="bi bi-lightning-charge me-2"></i>
                  Generate Credits
                </>
              )}
            </button>
          </form>
        </div>

        {/* Credits List */}
        <div className="modern-card mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">
              <i className="bi bi-list-ul me-2 text-primary"></i>
              All Generated Credits
            </h3>
            <button onClick={loadCredits} className="btn btn-outline-primary btn-sm">
              <i className="bi bi-arrow-clockwise me-2"></i>
              Refresh
            </button>
          </div>

          {credits.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Farm ID</th>
                    <th>Baseline (tons)</th>
                    <th>Actual (tons)</th>
                    <th>Reduction</th>
                    <th>Credits Generated</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {credits.map((credit, index) => (
                    <tr key={credit._id || index}>
                      <td><strong>{credit.farmId}</strong></td>
                      <td>{credit.baselineEmission?.toLocaleString()}</td>
                      <td>{credit.actualEmission?.toLocaleString()}</td>
                      <td className="text-success">
                        <i className="bi bi-arrow-down me-1"></i>
                        {calculateReduction(credit.baselineEmission, credit.actualEmission)}%
                      </td>
                      <td>
                        <span className="badge bg-success" style={{ fontSize: '1rem', padding: '0.5rem' }}>
                          {credit.creditsGenerated} credits
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          credit.status === 'verified' ? 'bg-success' : 
                          credit.status === 'sold' ? 'bg-info' : 
                          'bg-warning'
                        }`}>
                          {credit.status || 'pending'}
                        </span>
                      </td>
                      <td>{new Date(credit.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💳</div>
              <h4 className="mb-3">No Credits Generated Yet</h4>
              <p className="text-muted mb-4">
                Generate your first carbon credits by filling out the form above.
              </p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="modern-card">
          <h3 className="mb-4">
            <i className="bi bi-info-circle me-2 text-info"></i>
            How Carbon Credits Work
          </h3>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h5 className="feature-title">Conversion Rate</h5>
                <p className="feature-description">
                  1000 kg (1 ton) CO₂ reduction = 1 Carbon Credit
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card">
                <div className="feature-icon">🧮</div>
                <h5 className="feature-title">Formula</h5>
                <p className="feature-description">
                  Credits = (Baseline - Actual) / 1000
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card">
                <div className="feature-icon">💡</div>
                <h5 className="feature-title">Example</h5>
                <p className="feature-description">
                  Reduce from 5000 tons to 3000 tons = 2 credits earned
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h5 className="feature-title">Trading</h5>
                <p className="feature-description">
                  Credits can be traded or sold in carbon markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarbonCreditPage;
