// const Learner = require("../model/learnerModel");
// const axios = require("axios");

// class LearnerService {
//     // Enroll a learner in a course
//     async enrollCourse(payload, res) {
//         try {
//             const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });

//             if (!learner) {
//                 const newLearner = await Learner.create(payload);
//                 return {
//                     success: true,
//                     data: newLearner,
//                     message: "Learner created and course enrolled successfully",
//                 };
//             }

//             const newCourseIds = payload.enrolledCourses.map(course => course.courseId);
//             const existingCourseIds = learner.enrolledCourses.map(course => course.courseId);
//             const mergedCourseIds = [...existingCourseIds, ...newCourseIds];
//             const uniqueCourseIds = [...new Set(mergedCourseIds)];

//             learner.enrolledCourses = uniqueCourseIds.map(courseId => ({ courseId }));

//             const updatedLearner = await learner.save();

//             return {
//                 success: true,
//                 data: updatedLearner,
//                 message: "Course enrolled successfully",
//             };
//         } catch (err) {
//             return {
//                 success: false,
//                 message: err.message,
//             };
//         }
//     }

//     // Get enrolled courses of a learner
//     async getEnrolledCourses(payload, token) {
//         try {
//             const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });
//             if (!learner) {
//                 return {
//                     message: "No courses enrolled",
//                 };
//             }

//             const enrolledCourseIds = learner.enrolledCourses.map(course => course.courseId);
//             const courseDetailsPromises = enrolledCourseIds.map(async courseId => {
//                 const courseDetailsResponse = await axios.get(`http://localhost:8001/course/course_by_id/${courseId}`, {
//                     headers: {
//                         //Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 return courseDetailsResponse.data;
//             });

//             const courseDetails = await Promise.all(courseDetailsPromises);

//             const response = {
//                 courseDetails: courseDetails,
//             };

//             return {
//                 success: true,
//                 data: response,
//                 message: "Courses fetched successfully",
//             };
//         } catch (err) {
//             return {
//                 success: false,
//                 message: err.message,
//             };
//         }
//     }

//     // Get progress of a course
//     async getCourseProgress(payload) {
//         try {
//             const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });
//             if (!learner) {
//                 return {
//                     message: "No courses enrolled",
//                 };
//             }

//             const course = learner.enrolledCourses.find(course => course.courseId === payload.courseId);
//             if (!course) {
//                 return {
//                     message: "Course not enrolled",
//                 };
//             }

//             const courseProgress = {
//                 progress: course.progress,
//             };

//             return {
//                 data: courseProgress,
//                 message: "Course progress fetched successfully",
//             };
//         } catch (err) {
//             return {
//                 success: false,
//                 message: err.message,
//             };
//         }
//     }

//     // Update progress of a course
//     async updateCourseProgress(payload) {
//         try {
//             const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });
//             if (!learner) {
//                 return {
//                     message: "No courses enrolled",
//                 };
//             }

//             const courseIndex = learner.enrolledCourses.findIndex(course => course.courseId === payload.courseId);
//             if (courseIndex === -1) {
//                 return {
//                     message: "Course not enrolled",
//                 };
//             }

//             learner.enrolledCourses[courseIndex].progress = payload.progress;
//             await learner.save();

//             return {
//                 message: "Course progress updated successfully",
//             };
//         } catch (err) {
//             return {
//                 success: false,
//                 message: err.message,
//             };
//         }
//     }

//     // Delete enrolled course
//     async deleteEnrolledCourse(payload) {
//         try {
//             const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });
//             if (!learner) {
//                 return {
//                     message: "No courses enrolled",
//                 };
//             }

//             const courseIndex = learner.enrolledCourses.findIndex(course => course.courseId === payload.courseId);
//             if (courseIndex === -1) {
//                 return {
//                     message: "Course not enrolled",
//                 };
//             }

//             learner.enrolledCourses.splice(courseIndex, 1);
//             await learner.save();

//             return {
//                 message: "Course unenrolled successfully",
//             };
//         } catch (err) {
//             return {
//                 success: false,
//                 message: err.message,
//             };
//         }
//     }
// }

// module.exports = LearnerService;

const Learner = require("../model/learnerModel");
const axios = require("axios");

class LearnerService {
  // Enroll a learner in a course
  async enrollCourse(payload, res) {
    try {
      const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });

      if (!learner) {
        const newLearner = await Learner.create(payload);
        return {
          success: true,
          data: newLearner,
          message: "Learner created and course enrolled successfully",
        };
      }

      const newCourseIds = payload.enrolledCourses.map(
        (course) => course.courseId
      );
      const existingCourseIds = learner.enrolledCourses.map(
        (course) => course.courseId
      );
      const mergedCourseIds = [...existingCourseIds, ...newCourseIds];
      const uniqueCourseIds = [...new Set(mergedCourseIds)];

      learner.enrolledCourses = uniqueCourseIds.map((courseId) => ({
        courseId,
      }));

      const updatedLearner = await learner.save();

      return {
        success: true,
        data: updatedLearner,
        message: "Course enrolled successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  // Get enrolled courses of a learner
  async getEnrolledCourses(payload, token) {
    try {
      const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });
      if (!learner) {
        return {
          message: "No courses enrolled",
        };
      }

      const enrolledCourseIds = learner.enrolledCourses.map(
        (course) => course.courseId
      );
      const courseDetailsPromises = enrolledCourseIds.map(async (courseId) => {
        const courseDetailsResponse = await axios.get(
          `http://localhost:8001/course/course_by_id/${courseId}`,
          {
            headers: {
              //Authorization: `Bearer ${token}`,
            },
          }
        );
        return courseDetailsResponse.data;
      });

      const courseDetails = await Promise.all(courseDetailsPromises);

      const response = {
        courseDetails: courseDetails,
      };

      return {
        success: true,
        data: response,
        message: "Courses fetched successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  // Get progress of a course
  async getCourseProgress(payload) {
    try {
      const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });
      if (!learner) {
        return {
          message: "No courses enrolled",
        };
      }

      const course = learner.enrolledCourses.find(
        (course) => course.courseId === payload.courseId
      );
      if (!course) {
        return {
          message: "Course not enrolled",
        };
      }

      const courseProgress = {
        progress: course.progress,
      };

      return {
        data: courseProgress,
        message: "Course progress fetched successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  // Update progress of a course
  async updateCourseProgress(payload) {
    try {
      const learner = await Learner.findOne({ Learner_ID: payload.Learner_ID });
      if (!learner) {
        return {
          message: "No courses enrolled",
        };
      }

      const courseIndex = learner.enrolledCourses.findIndex(
        (course) => course.courseId === payload.courseId
      );
      if (courseIndex === -1) {
        return {
          message: "Course not enrolled",
        };
      }

      learner.enrolledCourses[courseIndex].progress = payload.progress;
      await learner.save();

      return {
        message: "Course progress updated successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  // Delete enrolled course
  async deleteEnrolledCourse(payload) {
    try {
      const { Learner_ID, courseId } = payload;
      const learner = await Learner.findOne({ Learner_ID });
      if (!learner) {
        return {
          message: "No courses enrolled",
        };
      }

      const courseIndex = learner.enrolledCourses.findIndex(
        (course) => course.courseId === courseId
      );
      if (courseIndex === -1) {
        return {
          message: "Course not enrolled",
        };
      }

      learner.enrolledCourses.splice(courseIndex, 1);
      await learner.save();

      return {
        message: "Course unenrolled successfully",
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

module.exports = LearnerService;
