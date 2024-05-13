const CourseService = require("../services/courseService");
const { SubscribeMessages, PublishMessage } = require("../utils/index.utils");
const { AUTH_ROUTING_KEY} = require("../config/index.config")
const upload = require("../config/multer.config");
const cloudinary = require("../config/cloudinary.config");

module.exports = (app, channel) => {
  const service = new CourseService();
  const baseUrl = "/course";

  SubscribeMessages(channel, service);

  //POST for create course
  app.post(
    `${baseUrl}/create_course`,
    upload.single("image"),
    async (req, res) => {
      try {
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "course_images",
          });

          const courseData = {
            ...req.body,
            imageUrl: result.secure_url,
          };

          const courseResult = await service.CreateCourse(courseData, res);
          res.send(courseResult);
        } else {
          res.status(400).send({ message: "No image file provided." });
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    }
  );


  // PUT route for updating a course
  app.put(`${baseUrl}/update/:id`, upload.single("image"), async (req, res) => {
    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "course_images",
        });
        let newImageUrl = result.secure_url; // Update imageUrl with the new image URL

        // Include the course ID and the data to update in data
        const data = {
          id: req.params.id,
          updateData: {
            ...req.body,
            imageUrl: newImageUrl, // Use the updated imageUrl
          },
        };
        const courseResult = await service.UpdateCourse(data, res);
        res.send(courseResult);
      } else {
        const data = {
          id: req.params.id,
          updateData: req.body,
        };
        const courseResult = await service.UpdateCourse(data, res);
        res.send(courseResult);
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  // PUT route for updating the status of a course
  app.put(`${baseUrl}/update_status/:id`, async (req, res) => {
    const data = {
      id: req.params.id,
      status: req.body.status, // Assuming the new status is passed in the request body
    };
    await service.UpdateCourseStatus(data, res);
  });

  // GET route for getting all courses
    app.post(`${baseUrl}/all_courses`, async (req, res) => {
        try {
            const result = await service.GetAllCourses(req.body.instructor ,res);
            // res.send(result)
            res.status(200).send({
              success: true,
              data: result,
              message: 'All Courses fetched successfully!'
          });

          //publish authEventData
          // PublishMessage(channel, AUTH_ROUTING_KEY, JSON.stringify(result))

        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    });

    //get course by ID
    app.get(`${baseUrl}/course_by_id/:id`, async (req, res) => {
        const data = {
            id: req.params.id
          };
        const result = await service.GetCourseById(data, res);
        res.send(result);
      });
};
