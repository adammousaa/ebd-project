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
      { name: 'Livestock', value: 1102.5, color: '#FF6B6B' },
      { name: 'Fertilizers', value: 735, color: '#4ECDC4' },
      { name: 'Machinery', value: 367.5, color: '#45B7D1' },
      { name: 'Transport', value: 245, color: '#96CEB4' }
    ]
  };

  return (
    <div className="emission-page">
      <header className="emission-header">
        <h1>📊 Emission Tracking Dashboard</h1>
        <p><strong>Feature 4:</strong> Backend + basic frontend charts</p>
        <p className="subtitle">Student 4 | Static frontend for Milestone 2</p>
      </header>

      <div className="summary-card">
        <h2>Total Carbon Emissions</h2>
        <div className="total-value">
          {emissionData.totalEmissions.toLocaleString()} <span className="unit">kg CO2</span>
        </div>
        <div className="trend">↓ 12% lower than last year</div>
      </div>

      <div className="chart-section">
        <h3>Monthly Emissions Trend</h3>
        <div className="bar-chart">
          {emissionData.monthlyData.map((item, index) => (
            <div key={index} className="bar-item">
              <div className="bar-label">{item.month}</div>
              <div 
                className="bar" 
                style={{ height: `${item.emissions / 5}px` }}
                title={`${item.emissions} kg CO2`}
              >
                <span className="bar-value">{item.emissions}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-section">
        <h3>Emission Sources</h3>
        <div className="pie-chart">
          {emissionData.sources.map((source, index) => (
            <div key={index} className="pie-item">
              <div 
                className="pie-segment" 
                style={{ 
                  backgroundColor: source.color,
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                {Math.round((source.value / emissionData.totalEmissions) * 100)}%
              </div>
              <div className="source-info">
                <div className="source-name">{source.name}</div>
                <div className="source-value">{source.value} kg</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="data-table">
        <h3>Monthly Data</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Emissions (kg CO2)</th>
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
                  <td>{item.month}</td>
                  <td>{item.emissions}</td>
                  <td className={change > 0 ? 'positive' : 'negative'}>
                    {change > 0 ? '↓' : '↑'} {Math.abs(change)} kg ({percentChange}%)
                  </td>
                  <td>
                    <span className={`status ${change > 0 ? 'good' : 'neutral'}`}>
                      {change > 0 ? 'Improving' : 'Stable'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="milestone-notes">
        <h3>Milestone 2 Status</h3>
        <p>Static dashboard with mock charts and data.</p>
        <p><strong>For Milestone 3:</strong> Will connect to backend API with real-time data.</p>
      </div>
    </div>
  );
};

export default EmissionDashboardPage;