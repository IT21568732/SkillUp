// const express = require('express');
// const router = express.Router();
// const learnerController = require('../controllers/learnerController');

// // Route to enroll a learner in a course
// router.post('/enroll', learnerController.enrollCourse);

// // Route to get enrolled courses of a learner
// router.post('/enrolled-courses', learnerController.getEnrolledCourses);

// // Route to get details of an enrolled course by its ID
// router.post('/enrolled-course-details', learnerController.getEnrolledCourseById);

// // Route to get progress of a course
// router.post('/course-progress', learnerController.getCourseProgress);

// // Route to update progress of a course
// router.put('/update-course-progress', learnerController.updateCourseProgress);

// // Route to delete an enrolled course
// router.delete('/delete-enrolled-course', learnerController.deleteEnrolledCourse);

// module.exports = router;

const express = require("express");
const router = express.Router();
const learnerController = require("../controllers/learnerController");

// Route to enroll a learner in a course
router.post("/enroll", learnerController.enrollCourse);

// Route to get enrolled courses of a learner
router.post("/enrolled-courses", learnerController.getEnrolledCourses);

// Route to get details of an enrolled course by its ID
router.post(
  "/enrolled-course-details",
  learnerController.getEnrolledCourseById
);

// Route to get progress of a course
router.post("/course-progress", learnerController.getCourseProgress);

// Route to update progress of a course
router.put("/update-course-progress", learnerController.updateCourseProgress);

// Route to delete an enrolled course
router.delete(
  "/delete-enrolled-course",
  learnerController.deleteEnrolledCourse
);

// Route to unenroll a course
router.delete("/unenroll-course", learnerController.unenrollCourse); // Add this line

module.exports = router;
