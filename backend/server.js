const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'realestate_',
  port: 3307 
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Route to create new user
app.post("/add_auth_users", (req, res) => {
  const sql = "INSERT INTO auth_users (`name`, `email`, `password`, `confirm_password`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.confirmpassword,
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json(err);
    }
    return res.json("User has been created");
  });
});

// Route to get properties from the DB
app.get('/api/properties', (req, res) => {
  db.query('SELECT * FROM properties', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json(results);
  });
});

// Route to serve hardcoded properties
app.get('/api/hardcoded-properties', (req, res) => {
  const hardcodedProperties = [
    {
      id: 1,
      title: "Cozy Apartment",
      description: "A beautiful and cozy 2-bedroom apartment in downtown.",
      location: "New York",
      price: 350000,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fcozy-apartment&psig=AOvVaw1gxSSRxJUS-4vZBfrW49SV&ust=1747234148988000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiF1MfYoI0DFQAAAAAdAAAAABAE",
    },
    {
      id: 2,
      title: "Modern Villa",
      description: "Spacious 5-bedroom villa with pool and garden.",
      location: "Los Angeles",
      price: 950000,
      image: "https://www.google.com/imgres?q=image%20of%20a%20modern%20villa&imgurl=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1661883964999-c1bcb57a7357%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.1.0%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwdmlsbGF8ZW58MHx8MHx8fDA%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fmodern-villa&docid=exlBLYV1ezDFcM&tbnid=LbeU9NaDrrDAcM&vet=12ahUKEwi5zbmZ2KCNAxVc3jgGHWdEKfgQM3oECHAQAA..i&w=3000&h=2102&hcb=2&ved=2ahUKEwi5zbmZ2KCNAxVc3jgGHWdEKfgQM3oECHAQAA",
    },
  ];

  res.json(hardcodedProperties);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
