const Lesson = require('../schema/lesson.schema')
const Course = require('../schema/course.schema')

class LessonService{

    async SubscribeEvents(payload) {
        payload = JSON.parse(payload);
    
        switch (payload.event) {
          case "CREATE_LESSON":
            this.CreateCourseTest(payload);
            break;
          case "GET_LESSONS":
            this.R_getCourses();
            break;
          default:
            break;
        }
      }

    //Create lessons
    async CreateLesson(payload, res) {
    const newLesson = await Lesson.create(payload);
    const course = await Course.findById(payload.courseId);

    if (!course) {
      res.status(404).send({
        success: false,
        data: null,
        message: "Course not found",
      });
    }

    course.lessons.push(newLesson._id);

    await course.save();

    res.status(200).send({
      success: true,
      data: newLesson,
      message: "Lesson created successfully",
    });
  }

  //delete lesson
  async DeleteLesson(payload, res) {
    const lesson = await Lesson.findByIdAndDelete(payload.id);

    if (!lesson) {
      return res.status(404).send({
        success: false,
        message: "Lesson not found",
      });
    }

    const courseId = lesson.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }

    course.lessons = course.lessons.filter(
      (id) => id.toString() !== lesson._id.toString()
    );

    await course.save();

    res.status(200).send({
      success: true,
      data: lesson,
      message: "Lesson deleted successfully",
    });
  }

  // Get all lessons for a given courseId
  async GetLesson(payload) {
    try {
      const lesson = await Lesson.findById(payload.id );

      if (!lesson) {
        return res.status(404).send({
          success: false,
          message: "No lessons found for the given courseId",
        });
      }

      return lesson;
    } catch (error) {
      console.error("Error fetching lessons:", error);
      res.status(500).send({
        success: false,
        message: "Failed to fetch lessons",
      });
    }
  }

}

module.exports = LessonService;