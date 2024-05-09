const express = require("express");
const router = express.Router();
const LearnerController = require("../controllers/learnerController")

//router.get("/", LearnerController.allStudents);

// Update a student
router.put("/update/:id", LearnerController.updatelearner);

// Delete a single student
router.delete("/delete/:id", LearnerController.deletelearner);

// Get details of a single student
router.get("/get/:id", LearnerController.singlelearner);

// search students
router.get("/search/:key", LearnerController.searchlearner);

module.exports = router;