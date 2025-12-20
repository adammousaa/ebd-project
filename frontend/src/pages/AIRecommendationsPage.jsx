import React, { useEffect, useState } from "react";
import axios from "axios";

function AIRecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/recommendations/student/3`);
        setRecommendations(res.data.recommendations || []);
      } catch (err) {
        console.error("Axios error:", err.response || err);
        setError("Failed to load recommendations. " + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="fade-in">
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">
              <i className="bi bi-robot me-3"></i>
              AI Recommendations
            </h1>
          </div>
        </div>
        <div className="container text-center py-5">
          <div className="spinner-modern"></div>
          <p className="text-muted mt-3">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="page-header">
          <div className="container">
            <h1 className="page-title">
              <i className="bi bi-robot me-3"></i>
              AI Recommendations
            </h1>
          </div>
        </div>
        <div className="container mt-4">
          <div className="alert-modern alert-danger">
            <h4 className="alert-heading">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Error Loading Recommendations
            </h4>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-robot me-3"></i>
            AI Recommendations
          </h1>
          <p className="page-subtitle">
            Personalized suggestions to reduce your carbon emissions
          </p>
        </div>
      </div>

      <div className="container">
        <div className="modern-card mb-4">
          <p className="lead mb-0">
            <i className="bi bi-info-circle me-2 text-info"></i>
            Based on your farm data, here are recommended actions to reduce emissions:
          </p>
        </div>
        
        {recommendations.length === 0 ? (
          <div className="modern-card">
            <div className="text-center py-5">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
              <h3 className="mb-3">No Recommendations Available</h3>
              <p className="text-muted mb-4">
                Please register a farm first to receive personalized recommendations.
              </p>
              <a href="/farm-registration" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Register a Farm
              </a>
            </div>
          </div>
        ) : (
          <div className="grid-modern">
            {recommendations.map((rec, index) => (
              <div key={index} className="feature-card">
                <div className="d-flex align-items-start mb-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      fontSize: '1.5rem'
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-grow-1">
                    <h4 className="feature-title mb-2">
                      <i className="bi bi-lightbulb-fill me-2 text-warning"></i>
                      {rec.title}
                    </h4>
                    <p className="feature-description mb-0">{rec.description}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-top">
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    Recommendation #{index + 1}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIRecommendationsPage;
