fetch('/oauth2/userinfo')
    .then(response => {
      const loginBtn = document.getElementById('loginBtn');
      const logoutBtn = document.getElementById('logoutBtn');

      if (response.ok) {
        // User is logged in: Hide Login, Show Logout
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
      } else {
        // User is guest: Show Login, Hide Logout
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
      }
    })
    .catch(error => {
      // If auth check fails, default to showing Login
      console.log('Auth check failed or user is guest');
      const loginBtn = document.getElementById('loginBtn');
      const logoutBtn = document.getElementById('logoutBtn');
      if (loginBtn) loginBtn.style.display = 'block';
      if (logoutBtn) logoutBtn.style.display = 'none';
    });
