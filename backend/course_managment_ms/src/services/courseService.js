const Course = require('../schema/course.schema'); // Import the Course model

class CourseService {
    async CreateCourse(payload, res) {
        try {
            let course = new Course({
                name: payload.courseName,
                price: payload.price,
                duration: payload.duration,
                description: payload.description,
                instructor: payload.instructor,
                category: payload.category
            });

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
}

module.exports = new CourseService();
