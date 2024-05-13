const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Create Express app
const app = express();

// Load environment variables
dotenv.config();

// Set up CORS
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database Connection Error: ", err);
  });

// Set up Body Parser middleware for JSON and URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import authentication routes
const authRoutes = require("./routes/authRoute");

// Route setup
app.use("/auth", authRoutes);

// Middleware for handling 404 errors
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Global error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Define the port for the server
const port = process.env.PORT || 8088;

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
