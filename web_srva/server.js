const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'webapp_user',
  password: 'webapp_123',
  database: 'webserver_db'
});

// Connect to database
db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// POST /api/login (SQL login)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database for the user
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const user = result[0];
    
    // Compare password with stored hash
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing password:', err);
        return res.status(500).json({ success: false, message: 'Error comparing password' });
      }

      if (isMatch) {
        req.session.user = user;  // Save the user session
        return res.json({ success: true, message: 'Login successful', user: { username: user.username } });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }
    });
  });
});

// GET /api/checkLogin (Check if logged in)
app.get('/api/checkLogin', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success: false, message: 'Error logging out' });
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
