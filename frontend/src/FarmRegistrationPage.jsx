import React, { useState } from 'react';
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

  // Submit form (frontend only for Milestone 2)
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate mock farm ID
      const farmId = `FARM${Date.now().toString().slice(-6)}`;
      
      const newFarm = {
        farmId,
        ...formData,
        farmSize: Number(formData.farmSize),
        registrationDate: new Date().toISOString(),
        status: 'pending'
      };

      // Add to local list
      setSubmittedFarms(prev => [newFarm, ...prev]);
      
      // Show success message
      alert(`✅ Farm registered successfully!\nFarm ID: ${farmId}\n\nNote: This is frontend simulation for Milestone 2. Backend integration comes later.`);
      
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
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="farm-registration-page">
      {/* Header */}
      <div className="registration-header">
        <h1>🌱 Farm Registration</h1>
        <p>Feature 2: Form + GPS location capture + backend model</p>
        <p className="subtitle">Register your farm to start tracking emissions</p>
      </div>

      <div className="registration-container">
        {/* Registration Form */}
        <div className="registration-card">
          <h2>Register Your Farm</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Farm Details */}
            <div className="form-section">
              <h3>Farm Details</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="farmName">Farm Name *</label>
                  <input
                    type="text"
                    id="farmName"
                    name="farmName"
                    value={formData.farmName}
                    onChange={handleChange}
                    placeholder="Green Valley Farm"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="farmerName">Farmer Name *</label>
                  <input
                    type="text"
                    id="farmerName"
                    name="farmerName"
                    value={formData.farmerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="farmer@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="farmSize">Farm Size (acres) *</label>
                  <input
                    type="number"
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

                <div className="form-group">
                  <label htmlFor="farmType">Farm Type *</label>
                  <select
                    id="farmType"
                    name="farmType"
                    value={formData.farmType}
                    onChange={handleChange}
                    required
                  >
                    <option value="crop">Crop Farm</option>
                    <option value="livestock">Livestock Farm</option>
                    <option value="mixed">Mixed Farming</option>
                    <option value="dairy">Dairy Farm</option>
                    <option value="poultry">Poultry Farm</option>
                    <option value="organic">Organic Farm</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Farm Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Farm Road, Countryside"
                />
              </div>
            </div>

            {/* GPS Location Section */}
            <div className="form-section location-section">
              <h3>📍 Farm Location</h3>
              <p className="section-description">Capture your farm's GPS coordinates for accurate tracking</p>
              
              <div className="location-buttons">
                <button 
                  type="button" 
                  onClick={captureGPSLocation}
                  className="btn-gps"
                >
                  📍 Capture GPS Location
                </button>
                <button 
                  type="button" 
                  onClick={handleManualLocation}
                  className="btn-manual"
                >
                  📝 Enter Manually
                </button>
              </div>

              {locationStatus && (
                <div className={`location-status ${locationStatus.includes('✅') ? 'success' : locationStatus.includes('❌') ? 'error' : 'info'}`}>
                  {locationStatus}
                </div>
              )}

              <div className="coordinates-display">
                <div className="form-group">
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="e.g., 40.7128"
                    readOnly
                    className="coordinate-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="e.g., -74.0060"
                    readOnly
                    className="coordinate-input"
                  />
                </div>
              </div>

              {formData.latitude && formData.longitude && (
                <div className="map-info">
                  <p>
                    <strong>Coordinates:</strong> {formData.latitude}, {formData.longitude}
                  </p>
                  <a 
                    href={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    🔗 View on Google Maps
                  </a>
                </div>
              )}
            </div>

            {/* Submit Section */}
            <div className="form-section submit-section">
              <div className="form-notice">
                <p>📋 <strong>Milestone 2 Note:</strong> This is frontend simulation. Backend integration will be added in the next milestone.</p>
              </div>
              
              <div className="submit-row">
                <p className="required-note">* Required fields</p>
                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.latitude}
                  className="btn-submit"
                >
                  {isSubmitting ? 'Registering...' : 'Register Farm'}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Registered Farms List */}
        {submittedFarms.length > 0 && (
          <div className="registered-farms">
            <h2>Registered Farms ({submittedFarms.length})</h2>
            <div className="farms-table">
              <table>
                <thead>
                  <tr>
                    <th>Farm ID</th>
                    <th>Farm Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedFarms.map((farm, index) => (
                    <tr key={index}>
                      <td><code>{farm.farmId}</code></td>
                      <td>{farm.farmName}</td>
                      <td>
                        <span className="farm-type">{farm.farmType}</span>
                      </td>
                      <td>{farm.farmSize} acres</td>
                      <td>
                        <span className="status-badge pending">Pending</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="info-card">
          <h3>📋 About Farm Registration</h3>
          <div className="info-content">
            <div className="info-item">
              <h4>📍 GPS Location</h4>
              <p>Required for accurate emissions tracking based on regional factors and climate data.</p>
            </div>
            <div className="info-item">
              <h4>🌱 Farm Type</h4>
              <p>Different farm types have different emission factors and reduction strategies.</p>
            </div>
            <div className="info-item">
              <h4>📊 Next Steps</h4>
              <p>After registration, you can track emissions, implement reductions, and earn carbon credits.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmRegistrationPage;