const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authConfig = require("../config/authConfig");
//? Load env variables
dotenv.config();

const AuthMiddleware = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  //! Checking token
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  jwt.verify(token, authConfig.secretKey, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    req.user = user.userId;
    req.userEmail = user.userEmail;
    console.log(req.userEmail);
    next();
  });
};

module.exports = AuthMiddleware;
