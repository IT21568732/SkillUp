const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");
const { Admin, Instructor, Learner } = require("../model/userModel");

const verifyTokenAndRole = (requiredRole) => async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    
    const decoded = jwt.verify(token, authConfig.secretKey);
    req.userId = decoded.userId;

    let Model;
    if (requiredRole === "ADMIN") {
      Model = Admin;
    } else if (requiredRole === "INSTRUCTOR") {
      Model = Instructor;
    } else if (requiredRole === "LEARNER") {
      Model = Learner;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await Model.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: "Not Authorized" });
    }
  } catch (error) {
    console.error("Authorization Error: ", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const checkAuth = {
  isAdmin: verifyTokenAndRole("ADMIN"),
  isMechanic: verifyTokenAndRole("INSTRUCTOR"),
  isCustomer: verifyTokenAndRole("LEARNER"),
};

module.exports = checkAuth;
