import React, { useState } from 'react';
import { farmAPI } from './services/api';
import './index.css';

function FarmRegistrationPage() {
  const [formData, setFormData] = useState({
    farmName: '',
    farmerName: '',
    email: '',
    phone: '',
    farmSize: '',
    farmType: 'crop',
    address: '',
    latitude: '',
    longitude: ''
  });

  const [locationStatus, setLocationStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFarms, setSubmittedFarms] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Capture GPS Location
  const captureGPSLocation = () => {
    setLocationStatus('Getting location...');
    
    if (!navigator.geolocation) {
      setLocationStatus('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6)
        }));
        setLocationStatus('✅ Location captured successfully!');
      },
      (error) => {
        let message = 'Unable to retrieve location. ';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            message += 'User denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            message += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message += 'The request to get user location timed out.';
            break;
          default:
            message += 'An unknown error occurred.';
        }
        setLocationStatus(`❌ ${message}`);
      }
    );
  };

  // Manual location input
  const handleManualLocation = () => {
    const lat = prompt("Enter latitude (e.g., 40.7128):");
    const lng = prompt("Enter longitude (e.g., -74.0060):");
    
    if (lat && lng) {
      setFormData(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng
      }));
      setLocationStatus('📍 Location entered manually');
    }
  };

  // Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate GPS coordinates
    if (!formData.latitude || !formData.longitude) {
      setLocationStatus('❌ Please capture or enter GPS location before submitting');
      return;
    }

    setIsSubmitting(true);
    setLocationStatus('');

    try {
      const response = await farmAPI.registerFarm({
        farmName: formData.farmName,
        farmerName: formData.farmerName,
        email: formData.email,
        phone: formData.phone,
        farmSize: formData.farmSize,
        farmType: formData.farmType,
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      });

      if (response.data.success) {
        const newFarm = response.data.data;
        setSubmittedFarms(prev => [newFarm, ...prev]);
        
        alert(`✅ Farm registered successfully!\nFarm ID: ${newFarm.farmId}\nFarm Name: ${newFarm.farmName}`);
        
        // Reset form
        setFormData({
          farmName: '',
          farmerName: '',
          email: '',
          phone: '',
          farmSize: '',
          farmType: 'crop',
          address: '',
          latitude: '',
          longitude: ''
        });
        setLocationStatus('');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to register farm';
      setLocationStatus(`❌ ${errorMessage}`);
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-house-door me-3"></i>
            Farm Registration
          </h1>
          <p className="page-subtitle">
            Register your farm with GPS location to start tracking emissions
          </p>
        </div>
      </div>

      <div className="container">
        <div className="modern-card">
          <h3 className="mb-4">
            <i className="bi bi-clipboard-data me-2 text-success"></i>
            Farm Registration Form
          </h3>
          
          <form onSubmit={handleSubmit}>
            {/* Farm Details */}
            <div className="form-section">
              <h4 className="mb-3">
                <i className="bi bi-info-circle me-2 text-primary"></i>
                Farm Details
              </h4>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="farmName" className="form-label-modern">
                      <i className="bi bi-house-door me-2"></i>
                      Farm Name *
                    </label>
                    <input
                      type="text"
                      className="form-control-modern"
                      id="farmName"
                      name="farmName"
                      value={formData.farmName}
                      onChange={handleChange}
                      placeholder="Green Valley Farm"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="farmerName" className="form-label-modern">
                      <i className="bi bi-person me-2"></i>
                      Farmer Name *
                    </label>
                    <input
                      type="text"
                      className="form-control-modern"
                      id="farmerName"
                      name="farmerName"
                      value={formData.farmerName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="email" className="form-label-modern">
                      <i className="bi bi-envelope me-2"></i>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-control-modern"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="farmer@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="phone" className="form-label-modern">
                      <i className="bi bi-telephone me-2"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control-modern"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="farmSize" className="form-label-modern">
                      <i className="bi bi-rulers me-2"></i>
                      Farm Size (acres) *
                    </label>
                    <input
                      type="number"
                      className="form-control-modern"
                      id="farmSize"
                      name="farmSize"
                      value={formData.farmSize}
                      onChange={handleChange}
                      placeholder="100"
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="farmType" className="form-label-modern">
                      <i className="bi bi-tags me-2"></i>
                      Farm Type *
                    </label>
                    <select
                      className="form-control-modern"
                      id="farmType"
                      name="farmType"
                      value={formData.farmType}
                      onChange={handleChange}
                      required
                    >
                      <option value="crop">🌾 Crop Farm</option>
                      <option value="livestock">🐄 Livestock Farm</option>
                      <option value="mixed">🌿 Mixed Farming</option>
                      <option value="dairy">🥛 Dairy Farm</option>
                      <option value="poultry">🐔 Poultry Farm</option>
                      <option value="organic">🌱 Organic Farm</option>
                    </select>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group-modern">
                    <label htmlFor="address" className="form-label-modern">
                      <i className="bi bi-geo-alt me-2"></i>
                      Farm Address
                    </label>
                    <input
                      type="text"
                      className="form-control-modern"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Farm Road, Countryside"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* GPS Location Section */}
            <div className="form-section location-section mt-4 pt-4 border-top">
              <h4 className="mb-3">
                <i className="bi bi-geo-alt me-2 text-primary"></i>
                Farm Location (GPS Coordinates)
              </h4>
              <p className="text-muted mb-4">Capture your farm's GPS coordinates for accurate tracking</p>
              
              <div className="d-flex gap-2 mb-3 flex-wrap">
                <button 
                  type="button" 
                  onClick={captureGPSLocation}
                  className="btn btn-primary"
                >
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Capture GPS Location
                </button>
                <button 
                  type="button" 
                  onClick={handleManualLocation}
                  className="btn btn-outline-secondary"
                >
                  <i className="bi bi-pencil me-2"></i>
                  Enter Manually
                </button>
              </div>

              {locationStatus && (
                <div className={`alert-modern ${
                  locationStatus.includes('✅') ? 'alert-success' : 
                  locationStatus.includes('❌') ? 'alert-danger' : 
                  'alert-info'
                }`}>
                  {locationStatus}
                </div>
              )}

              <div className="row g-3 mt-2">
                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="latitude" className="form-label-modern">
                      <i className="bi bi-arrow-up me-2"></i>
                      Latitude
                    </label>
                    <input
                      type="text"
                      className="form-control-modern"
                      id="latitude"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="e.g., 40.7128"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-modern">
                    <label htmlFor="longitude" className="form-label-modern">
                      <i className="bi bi-arrow-right me-2"></i>
                      Longitude
                    </label>
                    <input
                      type="text"
                      className="form-control-modern"
                      id="longitude"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="e.g., -74.0060"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {formData.latitude && formData.longitude && (
                <div className="alert-modern alert-success mt-3">
                  <i className="bi bi-check-circle me-2"></i>
                  <strong>Coordinates captured:</strong> {formData.latitude}, {formData.longitude}
                  {' '}
                  <a 
                    href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none ms-2"
                  >
                    <i className="bi bi-map me-1"></i>
                    View on Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Submit Section */}
            <div className="form-section submit-section mt-4 pt-4 border-top">
              <div className="alert-modern alert-info mb-3">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Note:</strong> GPS location is required to submit the form. Use the buttons above to capture or enter coordinates.
              </div>
              
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <p className="text-muted mb-0">
                  <i className="bi bi-asterisk me-1 text-danger"></i>
                  Required fields
                </p>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.latitude || !formData.longitude}
                  className="btn btn-success btn-lg"
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Registering...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Register Farm
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Registered Farms List */}
        {submittedFarms.length > 0 && (
          <div className="modern-card mt-4">
            <h3 className="mb-4">
              <i className="bi bi-list-check me-2 text-success"></i>
              Registered Farms ({submittedFarms.length})
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Farm ID</th>
                    <th>Farm Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedFarms.map((farm, index) => (
                    <tr key={index}>
                      <td><code className="bg-light px-2 py-1 rounded">{farm.farmId}</code></td>
                      <td><strong>{farm.farmName}</strong></td>
                      <td>
                        <span className="badge bg-secondary">{farm.farmType}</span>
                      </td>
                      <td>{farm.farmSize} acres</td>
                      <td>
                        {farm.latitude && farm.longitude && (
                          <small className="text-muted">
                            {parseFloat(farm.latitude).toFixed(4)}, {parseFloat(farm.longitude).toFixed(4)}
                          </small>
                        )}
                      </td>
                      <td>
                        <span className="status-badge status-pending">Pending</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="modern-card mt-4">
          <h3 className="mb-4">
            <i className="bi bi-info-circle me-2 text-info"></i>
            About Farm Registration
          </h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">📍</div>
                <h5 className="feature-title">GPS Location</h5>
                <p className="feature-description">
                  Required for accurate emissions tracking based on regional factors and climate data.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🌱</div>
                <h5 className="feature-title">Farm Type</h5>
                <p className="feature-description">
                  Different farm types have different emission factors and reduction strategies.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h5 className="feature-title">Next Steps</h5>
                <p className="feature-description">
                  After registration, you can track emissions, implement reductions, and earn carbon credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmRegistrationPage;