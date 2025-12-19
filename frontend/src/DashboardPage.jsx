const DashboardPage = () => {
  // Static data for Milestone 2
  const userData = {
    name: "John Farmer",
    email: "john.farmer@example.com",
    accountType: "Farmer Account",
    memberSince: "January 15, 2025",
    status: "Active",
    lastLogin: "Today, 10:30 AM"
  };

  return (
    <div className="dashboard-page">
      <h2>📊 User Dashboard</h2>
      <p>Welcome to your authentication dashboard</p>
      
      <div className="dashboard-card">
        <h3>Account Information</h3>
        
        <div className="info-item">
          <span className="label">Name:</span>
          <span className="value">{userData.name}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Email:</span>
          <span className="value">{userData.email}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Account Type:</span>
          <span className="value">{userData.accountType}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Member Since:</span>
          <span className="value">{userData.memberSince}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Last Login:</span>
          <span className="value">{userData.lastLogin}</span>
        </div>
        
        <div className="info-item">
          <span className="label">Status:</span>
          <span className="value"><span className="status">{userData.status}</span></span>
        </div>
      </div>
      
      <div className="feature-info" style={{maxWidth: '500px', marginTop: '30px'}}>
        <h3>Milestone 2 Status: Static Data</h3>
        <p>This dashboard shows hard-coded user data.</p>
        <p><strong>In Milestone 3:</strong> This data will be:</p>
        <ul>
          <li>Fetched from backend API using JWT token</li>
          <li>Protected by authentication middleware</li>
          <li>Stored in MongoDB database</li>
          <li>Updated in real-time</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;