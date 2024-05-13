const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Add this line
const learnerRoutes = require("./routes/learnerRoute");

const app = express();

// Load environment variables
dotenv.config();

// Set up CORS
app.use(cors()); // Allow requests from all origins. You can configure it to allow requests from specific origins.

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
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
app.use("/learner", learnerRoutes);

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
const port = process.env.PORT || 8003;
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log("Learner_sm is listening on port: " + port);
});
