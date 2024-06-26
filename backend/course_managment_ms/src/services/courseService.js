const Course = require('../schema/course.schema'); // Import the Course model

class CourseService {
    //? This is remote service function
  async SubscribeEvents(payload) {

    payload = JSON.parse(payload);

    const {event, data} = payload;

    const {userId} = data;

    switch (payload.event) {

      case "CREATE_COURSE":
          this.CreateCourse(payload);
          break;
      case "UPDATE_COURSE":
          this.UpdateCourse(payload);
          break;
      case "GET_COURSES":
          this.GetAllCourses(payload);
          break;
      default:
          console.log('Event not recognized');
          break;
    }
  }
  //create course
    async CreateCourse(payload, res) {
        try {
            let course = new Course(payload);

            await course.save();
            res.status(200).send({
                success: true,
                data: course,
                message: 'Course created successfully!'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: 'Failed to create course due to internal error'
            });
        }
    }

    // Update an existing course
    async UpdateCourse(payload, res) {
      const { id, updateData } = payload;
      try {
          const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });
          res.status(200).send({
              success: true,
              data: updatedCourse,
              message: 'Course updated successfully!'
          });
      } catch (error) {
          console.log(error);
          res.status(500).send({
              success: false,
              message: 'Failed to update course due to internal error'
          });
      }
  }

  // Update an existing course status
  async UpdateCourseStatus(payload, res) {
    const { id, status } = payload;
    try {
        const updatedCourseStatus = await Course.findByIdAndUpdate(id, {status:status}, { new: true });
        res.status(200).send({
            success: true,
            data: updatedCourseStatus,
            message: 'Course Status updated successfully!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Failed to update course status due to internal error'
        });
    }
}

    // Get all courses
    async GetAllCourses(payload,res) {
      try {
          const courses = await Course.find({ instructor: payload });
          return courses;
      } catch (error) {
          throw new Error('Failed to fetch courses');
      }
    }

    // Get all courses-user
    async GetAllCoursesUser(res) {
        try {
            const courses = await Course.find();
            return courses;
        } catch (error) {
            throw new Error('Failed to fetch courses');
        }
      }

    //get course by id
  async GetCourseById(payload) {
    const course = await Course.findById(payload.id)
      // .populate({
      //   path: "lessons",
      //   model: "Lesson",
      // })
      // .exec();

    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }
    return course;
  }
}

module.exports = CourseService;
