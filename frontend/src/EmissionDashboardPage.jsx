import React from 'react';

const EmissionDashboardPage = () => {
  const emissionData = {
    totalEmissions: 2450,
    monthlyData: [
      { month: 'Jan', emissions: 420 },
      { month: 'Feb', emissions: 380 },
      { month: 'Mar', emissions: 410 },
      { month: 'Apr', emissions: 350 },
      { month: 'May', emissions: 320 },
      { month: 'Jun', emissions: 290 }
    ],
    sources: [
      { name: 'Livestock', value: 1102.5, color: '#FF6B6B', icon: '🐄' },
      { name: 'Fertilizers', value: 735, color: '#4ECDC4', icon: '🌾' },
      { name: 'Machinery', value: 367.5, color: '#45B7D1', icon: '🚜' },
      { name: 'Transport', value: 245, color: '#96CEB4', icon: '🚚' }
    ]
  };

  const maxEmissions = Math.max(...emissionData.monthlyData.map(d => d.emissions));

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">
            <i className="bi bi-graph-up me-3"></i>
            Emission Tracking Dashboard
          </h1>
          <p className="page-subtitle">
            Monitor and analyze your carbon emissions over time
          </p>
        </div>
      </div>

      <div className="container">
        {/* Summary Card */}
        <div className="modern-card bg-gradient-success text-white mb-4">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3 className="mb-2">
                <i className="bi bi-cloud me-2"></i>
                Total Carbon Emissions
              </h3>
              <div className="d-flex align-items-baseline">
                <span style={{ fontSize: '3rem', fontWeight: '700', marginRight: '1rem' }}>
                  {emissionData.totalEmissions.toLocaleString()}
                </span>
                <span style={{ fontSize: '1.25rem', opacity: 0.9 }}>kg CO₂</span>
              </div>
              <div className="mt-2">
                <span className="badge bg-light text-success">
                  <i className="bi bi-arrow-down me-1"></i>
                  12% lower than last year
                </span>
              </div>
            </div>
            <div className="col-md-4 text-center mt-4 mt-md-0">
              <div style={{ fontSize: '5rem' }}>📊</div>
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="modern-card mb-4">
          <h3 className="mb-4">
            <i className="bi bi-calendar3 me-2 text-primary"></i>
            Monthly Emissions Trend
          </h3>
          <div className="d-flex align-items-end justify-content-between" style={{ height: '300px', gap: '1rem' }}>
            {emissionData.monthlyData.map((item, index) => {
              const height = (item.emissions / maxEmissions) * 100;
              return (
                <div key={index} className="flex-grow-1 d-flex flex-column align-items-center">
                  <div 
                    className="w-100 rounded-top position-relative"
                    style={{ 
                      background: `linear-gradient(to top, var(--primary-color), var(--primary-light))`,
                      height: `${height}%`,
                      minHeight: '20px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    title={`${item.emissions} kg CO₂`}
                  >
                    <div 
                      className="position-absolute top-0 start-50 translate-middle-x text-white fw-bold"
                      style={{ fontSize: '0.875rem', marginTop: '-1.5rem' }}
                    >
                      {item.emissions}
                    </div>
                  </div>
                  <div className="mt-2 fw-bold text-muted">{item.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emission Sources */}
        <div className="modern-card mb-4">
          <h3 className="mb-4">
            <i className="bi bi-pie-chart me-2 text-warning"></i>
            Emission Sources Breakdown
          </h3>
          <div className="row g-4">
            {emissionData.sources.map((source, index) => {
              const percentage = ((source.value / emissionData.totalEmissions) * 100).toFixed(1);
              return (
                <div key={index} className="col-md-6 col-lg-3">
                  <div className="stat-card" style={{ borderLeftColor: source.color }}>
                    <div className="text-center mb-3" style={{ fontSize: '2.5rem' }}>
                      {source.icon}
                    </div>
                    <div className="stat-value" style={{ color: source.color, fontSize: '1.75rem' }}>
                      {percentage}%
                    </div>
                    <div className="stat-label">{source.name}</div>
                    <div className="text-center mt-2">
                      <small className="text-muted">{source.value.toLocaleString()} kg</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Table */}
        <div className="modern-card">
          <h3 className="mb-4">
            <i className="bi bi-table me-2 text-info"></i>
            Monthly Data Overview
          </h3>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Emissions (kg CO₂)</th>
                  <th>Change</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {emissionData.monthlyData.map((item, index) => {
                  const prevMonth = index > 0 ? emissionData.monthlyData[index - 1].emissions : item.emissions;
                  const change = prevMonth - item.emissions;
                  const percentChange = ((change / prevMonth) * 100).toFixed(1);
                  
                  return (
                    <tr key={index}>
                      <td><strong>{item.month}</strong></td>
                      <td>{item.emissions.toLocaleString()}</td>
                      <td className={change > 0 ? 'text-success' : change < 0 ? 'text-danger' : 'text-muted'}>
                        {change > 0 ? '↓' : change < 0 ? '↑' : '→'} {Math.abs(change)} kg ({Math.abs(percentChange)}%)
                      </td>
                      <td>
                        <span className={`badge ${change > 0 ? 'bg-success' : 'bg-secondary'}`}>
                          {change > 0 ? 'Improving' : 'Stable'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionDashboardPage;
