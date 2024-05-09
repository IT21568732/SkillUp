const { Admin, Instructor, Learner } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const authConfig = require("../config/authConfig");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Determine the model based on the role
    let UserModel;
    let user;

 // Check for user in Admin collection
    user = await Admin.findOne({ email });
    if (user) {
      UserModel = Admin;
      console.log(req.body);
    } else {
      // Check for user in Instructor collection
       user = await Instructor.findOne({ email });
      if (user) {
        UserModel = Instructor;
        console.log(req.body);
      } else {
          // Check for user in Learner collection
         user = await Learner.findOne({ email });
        if (user) {
          UserModel = Learner;
        } else {
          return res.status(401).json({ message: "Authentication Failed" });
        }
      }
    }

    // Compare passwords
    if (user) {
      console.log("User:", user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Is Password Valid:", isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Authentication Failed" });
      }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      authConfig.secretKey,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Authentication Successful",
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
    });
  }
  } catch (error) {
    console.log(req.body);
    console.error("Login Errrror", error);
    return res.status(500).json({ Login_Error: error.message });
  }
};

exports.register = async (req, res, next) => {
  const { name, email, password, mobile, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Determine the model based on the role
    let UserModel;
    if (role === "ADMIN") {
      UserModel = Admin;
    } else if (role === "INSTRUCTOR") {
      UserModel = Instructor;
    } else if (role === "LEARNER") {
      UserModel = Learner;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    // Save the user to the database
    const result = await newUser.save();

    console.log(result);
    return res.status(201).json({
      message: "Registered Successfully",
      user: result,
    });
  } catch (error) {
    console.error("Registration Error", error);
    return res.status(500).json({ Registration_Error: error.message });
  }
};
