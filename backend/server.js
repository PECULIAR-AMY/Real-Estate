import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json()); 

// Test route
app.get("/", (req, res) => {
   res.send("server is running"); 
});

// Example data route
app.get("/api/properties", (req, res) => {
   const properties = [
      { id: 1, name: "Property A", price: 100000 },
      { id: 2, name: "Property B", price: 150000 }
   ];
   res.json(properties);
});

const port = process.env.PORT || 5175;

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});
