const LoginPage = () => {
  return (
    <div className="login-page">
      <h2>🔑 User Login</h2>
      <p>Feature 1: User Authentication System</p>
      
      <form onSubmit={(e) => { e.preventDefault(); alert('Login submitted (static demo)'); }}>
        <div>
          <label>Email Address:</label>
          <input type="email" placeholder="demo@example.com" defaultValue="demo@example.com" required />
        </div>
        
        <div>
          <label>Password:</label>
          <input type="password" placeholder="••••••••" defaultValue="password123" required />
        </div>
        
        <button type="submit">Login</button>
      </form>
      
      <div className="feature-info" style={{maxWidth: '400px'}}>
        <h4>What this will do in Milestone 3:</h4>
        <ul>
          <li>Send credentials to backend API</li>
          <li>Validate user in MongoDB database</li>
          <li>Compare hashed password using bcrypt</li>
          <li>Generate JWT token for session</li>
          <li>Store token securely in browser</li>
          <li>Redirect to authenticated dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default LoginPage;