const Course = require('../schema/course.schema'); // Import the Course model

class CourseService {
    //? This is remote service function
  async SubscribeEvents(payload) {
    payload = JSON.parse(payload);

    switch (payload.event) {
      case "CREATE_COURSE":
        this.CreateCourse(payload);
        break;
      case "GET_COURSES":
        this.R_getCourses();
        break;
      default:
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
}

module.exports = CourseService;
