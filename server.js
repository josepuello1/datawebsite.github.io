// Import the required libraries
const express = require("express"); // Express helps create the web server
const cors = require("cors");       // CORS allows your frontend to connect to the backend
const { Pool } = require("pg");     // pg provides the PostgreSQL connection pool
require("dotenv").config(); // Load environment variables from .env

// Create the Express app
const app = express();
const port = process.env.PORT || 3000; // The server will run at http://localhost:3000

// Setup the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, // database se estaba creando. Esperando por contraseña
  port: parseInt(process.env.DB_PORT, 10),
  ssl: process.env.DB_SSL === "true" // Important for cloud-hosted DBs
});

// Allow CORS so that your HTML/JS frontend can request from this server
app.use(cors());

// Define an API route that sends all orders as JSON
app.get("/api/orders", async (req, res) => {
  try {
    // Query the PostgreSQL database
    const result = await pool.query("SELECT * FROM ordenes");
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
  console.log(`Server running at port ${port}`);
});
