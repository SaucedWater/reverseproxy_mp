/* login.js content */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const msgElement = document.getElementById('loginMsg');
  
  // Show loading
  msgElement.textContent = 'Logging in...';
  msgElement.className = 'query-display';
  
  try {
    // Call vulnerable API endpoint
    const response = await fetch('/api/login-vulnerable', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    // Display the SQL query
    msgElement.innerHTML = `<strong>SQL Query Executed:</strong><br>
      <code style="color: #3b82f6;">${data.query || 'N/A'}</code>`;
    
    if (data.success) {
      // Check for SQL injection
      if (username.includes("'") || username.includes("--") || 
          username.toLowerCase().includes(" or ") || username.toLowerCase().includes("union")) {
        msgElement.innerHTML += '<br><br><span class="sql-injection-warning">⚠️ SQL INJECTION DETECTED!</span>';
        msgElement.innerHTML += '<br><span style="color: #10b981; font-weight: bold;">✓ Authentication bypassed!</span>';
        msgElement.innerHTML += '<br><span style="color: #10b981;">✓ Logged in as: ' + data.user.username + '</span>';
      } else {
        msgElement.innerHTML += '<br><br><span style="color: #10b981; font-weight: bold;">✓ Login successful!</span>';
        msgElement.innerHTML += '<br>Welcome, ' + data.user.username + '!';
      }
      
      // Redirect to index after 2 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    } else {
      msgElement.innerHTML += '<br><br><span style="color: #ef4444; font-weight: bold;">✗ Login failed</span>';
      msgElement.innerHTML += '<br>' + data.message;
    }
    
  } catch (error) {
    console.error('Login error:', error);
    msgElement.innerHTML = '<span style="color: #ef4444;">Error connecting to server: ' + error.message + '</span>';
  }
});
