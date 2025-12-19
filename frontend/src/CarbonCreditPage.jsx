import React, { useState } from 'react';
import './index.css'; // Your existing CSS

function CarbonCreditPage() {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendUrl = "http://localhost:5000/api/credits";

  // Form state
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
      const response = await fetch(`${backendUrl}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmId: formData.farmId,
          baselineEmission: Number(formData.baselineEmission),
          actualEmission: Number(formData.actualEmission)
        })
      });

      const data = await response.json();
      alert(`✅ Credits Generated: ${data.credit.creditsGenerated}`);
      
      // Reset form
      setFormData({
        farmId: '',
        baselineEmission: '',
        actualEmission: ''
      });

      // Reload credits list
      loadCredits();
      
    } catch (err) {
      console.error("Error generating credits:", err);
      alert("❌ Error generating credits. Check console or backend.");
    } finally {
      setLoading(false);
    }
  };

  const loadCredits = async () => {
    try {
      const response = await fetch(`${backendUrl}/all`);
      const creditsData = await response.json();
      setCredits(creditsData);
    } catch (err) {
      console.error("Error loading credits:", err);
      alert("Error loading credits");
    }
  };

  return (
    <div className="carbon-credit-page container">
      <div className="emission-header">
        <h1>Carbon Credit Generation</h1>
        <p>Feature 5: Simulated emission-to-credit logic</p>
        <p className="subtitle">Convert emission reductions into carbon credits</p>
      </div>

      <div className="credit-section">
        <div className="summary-card">
          <h2>Generate New Credits</h2>
          <form onSubmit={handleGenerate} id="generateForm">
            <div className="form-group">
              <label htmlFor="farmId">Farm ID</label>
              <input 
                type="text" 
                id="farmId" 
                placeholder="Enter Farm ID" 
                value={formData.farmId}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="baselineEmission">Baseline Emission (tons)</label>
              <input 
                type="number" 
                id="baselineEmission" 
                placeholder="Baseline emission amount" 
                value={formData.baselineEmission}
                onChange={handleInputChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="actualEmission">Actual Emission (tons)</label>
              <input 
                type="number" 
                id="actualEmission" 
                placeholder="Actual emission amount" 
                value={formData.actualEmission}
                onChange={handleInputChange}
                required 
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Credits'}
            </button>
          </form>
        </div>

        <div className="data-table">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>All Generated Credits</h3>
            <button onClick={loadCredits} className="secondary-btn">
              Load Credits
            </button>
          </div>

          {credits.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Farm ID</th>
                  <th>Baseline (tons)</th>
                  <th>Actual (tons)</th>
                  <th>Reduction</th>
                  <th>Credits Generated</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {credits.map((credit, index) => (
                  <tr key={index}>
                    <td>{credit.farmId}</td>
                    <td>{credit.baselineEmission}</td>
                    <td>{credit.actualEmission}</td>
                    <td className="positive">
                      {((credit.baselineEmission - credit.actualEmission) / credit.baselineEmission * 100).toFixed(1)}%
                    </td>
                    <td><strong>{credit.creditsGenerated}</strong></td>
                    <td>{new Date().toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-data">
              <p>No credits generated yet. Generate some to see them here!</p>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>How Carbon Credits Work</h3>
          <ul>
            <li><strong>Conversion Rate:</strong> 1000 kg (1 ton) CO2 reduction = 1 Carbon Credit</li>
            <li><strong>Formula:</strong> Credits = (Baseline - Actual) / 1000</li>
            <li><strong>Example:</strong> Reduce from 5000 tons to 3000 tons = 2 credits earned</li>
            <li>Credits can be traded or sold in carbon markets</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CarbonCreditPage;