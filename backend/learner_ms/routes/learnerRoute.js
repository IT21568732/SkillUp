const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.post('/enroll', learnerController.enrollCourse);
router.get('/enrolled-courses', learnerController.getEnrolledCourses);
router.put('/update-progress', learnerController.updateProgress);

module.exports = router;
