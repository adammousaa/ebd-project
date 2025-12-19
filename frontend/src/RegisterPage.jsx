const RegisterPage = () => {
  return (
    <div className="register-page">
      <h2>📝 User Registration</h2>
      <p>Feature 1: User Authentication System</p>
      
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        alert('Registration submitted (static demo)\n\nIn Milestone 3: Will hash password and save to MongoDB'); 
      }}>
        <div>
          <label>Full Name:</label>
          <input type="text" placeholder="John Farmer" required />
        </div>
        
        <div>
          <label>Email Address:</label>
          <input type="email" placeholder="john@example.com" required />
        </div>
        
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Minimum 6 characters" required />
        </div>
        
        <div>
          <label>Confirm Password:</label>
          <input type="password" placeholder="Re-enter password" required />
        </div>
        
        <button type="submit">Create Account</button>
      </form>
      
      <div className="feature-info" style={{maxWidth: '400px'}}>
        <h4>Backend Security Features (Milestone 3):</h4>
        <ul>
          <li><strong>Password Hashing:</strong> Using bcrypt with salt rounds</li>
          <li><strong>JWT Tokens:</strong> JSON Web Tokens for authentication</li>
          <li><strong>Email Validation:</strong> Check for duplicate emails</li>
          <li><strong>Data Validation:</strong> MongoDB schema validation</li>
          <li><strong>Security:</strong> No plaintext password storage</li>
        </ul>
      </div>
    </div>
  );
};

export default RegisterPage;