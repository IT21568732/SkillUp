const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { 
    type: String, 
    required: true 
  },
  mobile: { type: String },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "INSTRUCTOR", "LEARNER"],
  },
});

// Create models for each type of user in separate databases
const Admin = mongoose.model("Admin", userSchema, "admin_users");
const Instructor = mongoose.model("Instructor", userSchema, "instructor_users");
const Learner = mongoose.model("Learner", userSchema, "learner_users");

module.exports = { Admin, Instructor, Learner };