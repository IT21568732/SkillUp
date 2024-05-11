const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const authRoutes = require("./routes/authRoute");

// Load environment variables
dotenv.config();

// Set up CORS
const corsOptions = {
  origin: 'http://localhost:3000' || "http://localhost:8002",
};
app.use(cors(corsOptions));

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

// Set up Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
app.use("/auth", authRoutes);

// Server Side Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Create HTTP server
const port = process.env.PORT || 8088;
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
