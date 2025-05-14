const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const app = express();
const port = 5000;

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'realestate_',
  port: 3307,
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'upload')));
app.use(fileUpload()); // Enable file uploads

// MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});


// === Signup Route ===
app.post("/add-auth_users", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Validate input
  if (!name || !email ||  !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const sql = "INSERT INTO auth_users (name, email, password, confirm_password) VALUES (?, ?, ?, ?)";
  const values = [name, email, password, confirmPassword];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: "Failed to register user", details: err });
    }
    res.status(201).json({ message: "User created successfully" });
  });
});

// === Login Route ===
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email  ||!password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM auth_users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.json({ message: "Login successful", user });
  });
});


// Add Property Route
app.post('/api/properties/add', (req, res) => {
  const { title, description, location, price, property_type } = req.body;

  // Validate required fields
  if (!title  || !description || !location  || !price  || !property_type) {
    return res.status(400).json({ error: "All text fields are required" });
  }

  // Handle image upload
  let imageFilename = null;
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: "Image file is required" });
  }

  const image = req.files.image;
  imageFilename = Date.now() + '-' + image.name;

  // Save image to upload/images directory
  const uploadPath = path.join(__dirname, 'upload', 'images', imageFilename);

  image.mv(uploadPath, (err) => {
    if (err) {
      console.error("Error saving image:", err);
      return res.status(500).json({ error: "Failed to upload image" });
    }

    // Insert into DB
    const sql = `
      INSERT INTO property table
        (title, description, location, price, property_type, image) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [title, description, location, price, property_type, `/images/${imageFilename}`];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to save property to database" });
      }
      res.status(201).json({ message: "Property added successfully", propertyId: result.insertId });
    });
  });
});

// Get all properties
app.get('/api/properties', (req, res) => {
  const sql = 'SELECT * FROM property table';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});