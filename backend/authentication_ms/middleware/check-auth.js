const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const { Admin, Instructor, Learner } = require("../model/userModel");

// Middleware function to verify token and role
const verifyTokenAndRole = (requiredRole) => async (req, res, next) => {
  try {
    // Extract token from request headers
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    
    // Verify and decode the token
    const decoded = jwt.verify(token, authConfig.secretKey);
    req.userId = decoded.userId;

    let Model;
     // Determine which user model to use based on required role
    if (requiredRole === "ADMIN") {
      Model = Admin;
    } else if (requiredRole === "INSTRUCTOR") {
      Model = Instructor;
    } else if (requiredRole === "LEARNER") {
      Model = Learner;
    } else {
      // Invalid role provided
      return res.status(400).json({ message: "Invalid role" });
    }

    // Find the user by ID in the appropriate model
    const user = await Model.findById(req.userId);
    if (!user) {
       // User not found
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if user has the required role
    if (user.role === requiredRole) {
      // User is authorized, proceed to the next middleware or route handler
      next();
    } else {
       // User does not have the required role, access denied
      res.status(403).json({ message: "Not Authorized" });
    }
  } catch (error) { 
    // Handle authorization errors
    console.error("Authorization Error: ", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Object containing middleware functions to check user roles
const checkAuth = {
  isAdmin: verifyTokenAndRole("ADMIN"),
  isMechanic: verifyTokenAndRole("INSTRUCTOR"),
  isCustomer: verifyTokenAndRole("LEARNER"),
};

module.exports = checkAuth;
