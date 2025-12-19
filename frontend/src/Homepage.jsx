const HomePage = () => {
  return (
    <div className="home-page">
      <h1>🔐 Feature 1: User Authentication</h1>
      <p><strong>Student 1:</strong> Registration, Login, JWT, Password Hashing</p>
      
      <div className="feature-info">
        <h3>Milestone 2: Static Frontend Only</h3>
        <p>This demonstrates the UI components for User Authentication:</p>
        <ul>
          <li><strong>Registration Form:</strong> User sign-up interface</li>
          <li><strong>Login Form:</strong> User authentication interface</li>
          <li><strong>Dashboard:</strong> User profile and status page</li>
          <li><strong>Navigation:</strong> Between authentication pages</li>
        </ul>
        <p><strong>Note:</strong> All data is static/hard-coded for Milestone 2.</p>
        <p><strong>Milestone 3:</strong> Will connect to backend API with JWT & password hashing.</p>
      </div>
      
      <div style={{marginTop: '40px'}}>
        <h3>Navigate to:</h3>
        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px'}}>
          <a href="/login" style={{padding: '12px 24px', background: '#3498db', color: 'white', borderRadius: '6px', textDecoration: 'none'}}>
            Login Page
          </a>
          <a href="/register" style={{padding: '12px 24px', background: '#27ae60', color: 'white', borderRadius: '6px', textDecoration: 'none'}}>
            Register Page
          </a>
          <a href="/dashboard" style={{padding: '12px 24px', background: '#9b59b6', color: 'white', borderRadius: '6px', textDecoration: 'none'}}>
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;