// const Learner = require('../model/learnerModel');
// const axios = require("axios");

// exports.enrollCourse = async (req, res) => {
//     const { learnerId, enrolledCourses } = req.body;
//     try {
//       const learner = await Learner.findOne({ Learner_ID: learnerId });
//     //   if (!learner) {
//     //     return res.status(404).json({ error: 'Learner not found' });
//     //   }
      
//       // Iterate through each enrolled course in the input data
//       for (const course of enrolledCourses) {
//         const courseId = course.courseId;
//         // Check if learner is already enrolled in the course
//         const isEnrolled = learner.enrolledCourses.some(enrolledCourse => enrolledCourse.courseId === courseId);
//         if (isEnrolled) {
//           return res.status(400).json({ error: 'Learner is already enrolled in this course' });
//         }
        
//         // Enroll learner in the course
//         learner.enrolledCourses.push({ courseId, progress: course.progress || 0 });
//       }
      
//       // Save the updated learner document
//       await learner.save();
      
//       res.json({ message: 'Courses enrolled successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  

// exports.getEnrolledCourses = async (req, res) => {
//   const { learnerId } = req.params;
//   try {
//     const learner = await Learner.findOne({ Learner_ID: learnerId });
//     if (!learner) {
//       return res.status(404).json({ error: 'Learner not found' });
//     }
//     res.json({ enrolledCourses: learner.enrolledCourses });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// exports.updateProgress = async (req, res) => {
//   const { learnerId, courseId, progress } = req.body;
//   try {
//     const learner = await Learner.findOne({ Learner_ID: learnerId });
//     if (!learner) {
//       return res.status(404).json({ error: 'Learner not found' });
//     }
//     const enrolledCourse = learner.enrolledCourses.find(course => course.courseId === courseId);
//     if (!enrolledCourse) {
//       return res.status(400).json({ error: 'Learner is not enrolled in this course' });
//     }
//     enrolledCourse.progress = progress;
//     await learner.save();
//     res.json({ message: 'Progress updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };






// const Learner = require('../model/learnerModel');
// const axios = require('axios');

// exports.enrollCourse = async (req, res) => {
//   const { learnerId, enrolledCourses } = req.body;
//   try {
//       const learner = await Learner.findById(learnerId);
//       if (!learner) {
//           return res.status(404).json({ error: 'Learner not found' });
//       }
      
//       // Check if learner is already enrolled in any of the courses
//       const isAlreadyEnrolled = enrolledCourses.some(course => {
//           return learner.enrolledCourses.some(enrolledCourse => enrolledCourse.courseId === course.courseId);
//       });
//       //checking and if not, error
//       if (isAlreadyEnrolled) {
//           return res.status(400).json({ error: 'Learner is already enrolled in one or more of the courses' });
//       }
      
//       // Enroll learner in the courses
//       enrolledCourses.forEach(course => {
//           learner.enrolledCourses.push({ courseId: course.courseId, progress: 0 });
//       });
//       await learner.save();
//       //save and success message
//       res.json({ message: 'Courses enrolled successfully' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };
// exports.getEnrolledCourses = async (req, res) => {
//   try {
//       const learnerId = req.params.learnerId;
      
//       // Query the database for the learner and populate enrolledCourses with course IDs
//       const learner = await Learner.findOne({ Learner_ID: learnerId });
      
//       if (!learner) {
//           return res.status(404).json({ error: 'Learner not found' });
//       }
      
//       // Map enrolled course IDs
//       const enrolledCourses = learner.enrolledCourses.map(course => course.courseId);
      
//       // Fetch course details from course_ms microservice for each enrolled course respectively
//       const courseDetailsPromises = enrolledCourses.map(async courseId => {
//           try {
//               // Fetching course details
//               const courseDetailsResponse = await axios.get(`http://localhost:8001/course_by_id/:id`, {
//                   data: { id: courseId }
//               });
//               return courseDetailsResponse.data;
//           } catch (error) {
//               // if course details cannot be fetched, error
//               console.error(`Error fetching course details for course ID ${courseId}:`, error);
//               return { error: 'Error fetching course details' };
//           }
//       });
      
//       // Wait for all course details to be fetched
//       const courseDetails = await Promise.all(courseDetailsPromises);
      
//       res.json({ enrolledCourses: courseDetails });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };
// exports.updateProgress = async (req, res) => {
//   const { learnerId, courseId, progress } = req.body;
//   try {
//       const learner = await Learner.findById(learnerId);
//       if (!learner) {
//           return res.status(404).json({ error: 'Learner not found' });
//       }
      
//       // Find enrolled course
//       const enrolledCourse = learner.enrolledCourses.find(course => course.courseId.toString() === courseId);
//       if (!enrolledCourse) {
//           return res.status(400).json({ error: 'Learner is not enrolled in this course' });
//       }
      
//       // Update progress
//       enrolledCourse.progress = progress;
//       await learner.save();
      
//       res.json({ message: 'Progress updated successfully' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };

const Learner = require("../model/learnerModel");
const LearnerService = require("../services/LearnerService");

const learnerService = new LearnerService();

// Controller functions
const enrollCourse = async (req, res) => {
    const payload = req.body;
    const result = await learnerService.enrollCourse(payload, res);
    res.json(result);
};

const getEnrolledCourses = async (req, res) => {
    const payload = req.body;
    const token = req.headers.authorization; // Assuming token is passed in the headers
    const result = await learnerService.getEnrolledCourses(payload, token);
    res.json(result);
};

const getEnrolledCourseById = async (req, res) => {
    const payload = req.body;
    const token = req.headers.authorization; // Assuming token is passed in the headers
    const result = await learnerService.getEnrolledCourseById(payload, res, token);
    res.json(result);
};

const getCourseProgress = async (req, res) => {
    const payload = req.body;
    const result = await learnerService.getCourseProgress(payload, res);
    res.json(result);
};

const updateCourseProgress = async (req, res) => {
    const payload = req.body;
    const result = await learnerService.updateCourseProgress(payload, res);
    res.json(result);
};

const deleteEnrolledCourse = async (req, res) => {
    const payload = req.body;
    const result = await learnerService.deleteEnrolledCourse(payload, res);
    res.json(result);
};

module.exports = {
    enrollCourse,
    getEnrolledCourses,
    getEnrolledCourseById,
    getCourseProgress,
    updateCourseProgress,
    deleteEnrolledCourse,
};
