// Import the required libraries
const express = require("express"); // Express helps create the web server
const cors = require("cors");       // CORS allows your frontend to connect to the backend
const { Pool } = require("pg");     // pg provides the PostgreSQL connection pool

// Create the Express app
const app = express();
const port = 3000; // The server will run at http://localhost:3000

// Setup the PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",       // <-- Replace with your PostgreSQL username
  host: "localhost",          // <-- Use your local machine now, update later to remote IP
  database: "Pichardo",  // <-- Replace with your PostgreSQL database name
  password: "jo19se93jo",  // <-- Replace with your PostgreSQL password
  port: 5432                  // Default PostgreSQL port
});

// Allow CORS so that your HTML/JS frontend can request from this server
app.use(cors());

// Define an API route that sends all orders as JSON
app.get("/api/orders", async (req, res) => {
  try {
    // Query the PostgreSQL database
    const result = await pool.query("SELECT * FROM orders");
    // Send the result back to the frontend in JSON format
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    // If there's an error, send a 500 status and an error message
    res.status(500).json({ error: "Database error" });
  }
});

// Start the server on port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
