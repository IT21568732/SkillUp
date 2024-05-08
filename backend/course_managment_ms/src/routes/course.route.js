const CourseService = require('../services/courseService')
const {SubscribeMessages} = require('../utils/index.utils')
const upload = require('../config/multer.config')
const cloudinary = require('../config/cloudinary.config')

module.exports = (app, channel) => {
    const service = new CourseService();
    const baseUrl = '/course'

    SubscribeMessages(channel, service)

    //POST for create course
    app.post(`${baseUrl}/create_course`,upload.single('image'), async (req, res) => {
        try{
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "course_images"
                });
    
                const courseData = {
                    ...req.body,
                    imageUrl: result.secure_url
                };
    
            const courseResult  = await service.CreateCourse(courseData, res);
            res.send(courseResult);
        }else {
            res.status(400).send({ message: 'No image file provided.' });
        }
        }catch(error){
            res.status(500).send({ message: error.message });
        }
    });

    // PUT route for updating a course
    app.put(`${baseUrl}/update/:id`, async (req, res) => {
        // Include the course ID and the data to update in data
        const data = {
            id: req.params.id,
            updateData: req.body
        };
        const result = await service.UpdateCourse(data, res);
        res.send(result);
    });

    // PUT route for updating the status of a course
    app.put(`${baseUrl}/update_status/:id`, async (req, res) => {
        const data = {
            id: req.params.id,
            status: req.body.status  // Assuming the new status is passed in the request body
        };
        await service.UpdateCourseStatus(data, res);
    });
}