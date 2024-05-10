const LessonService = require('../services/lessonService')
const { SubscribeMessages } = require("../utils/index.utils");
const upload = require("../config/multer.config");
const cloudinary = require("../config/cloudinary.config");

module.exports = (app, channel) => {
    const service = new LessonService();
    const baseUrl = '/lesson'

    //listen to 
    SubscribeMessages(channel, service)

    //routes
    // POST for create lesson
    app.post(
        `${baseUrl}/create_lesson`,
        upload.fields([
        { name: "video", maxCount: 1 },
        { name: "note", maxCount: 1 },
        ]),
        async (req, res) => {
        try {
            const { courseId, title, lessonDes } = req.body;
    
            // Check if courseId exists and is valid
            if (!courseId) {
            return res.status(400).send({ message: "CourseId is required." });
            }
    
            // Check if video file exists
            if (!req.files || !req.files["video"]) {
            return res.status(400).send({ message: "No video file provided." });
            }
    
            // Check if note file exists
            if (!req.files || !req.files["note"]) {
            return res.status(400).send({ message: "No note file provided." });
            }
    
            const videoFile = req.files["video"][0];
            const noteFile = req.files["note"][0];
    
            // Upload video file to cloudinary
            const videoResult = await cloudinary.uploader.upload(videoFile.path,{resource_type:'video', folder: "lesson_videos"});
    
            // Upload note file to cloudinary
            const noteResult = await cloudinary.uploader.upload(noteFile.path,{resource_type:'raw',folder: "lesson_notes"});
    
            // Construct lesson data
            const lessonData = {
            courseId,
            title,
            lessonDes,
            video: videoResult.secure_url,
            note: noteResult.secure_url,
            };
    
            const lessonResult = await service.CreateLesson(lessonData, res);
            res.send(lessonResult);
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: error.message });
        }
        }
    );

     //delete lesson
  app.delete(`${baseUrl}/delete`, async (req, res) => {
    const result = await service.DeleteLesson(req.body, res);
    res.send(result);
  });

  //get single lesson 
  app.get(`${baseUrl}/:id`, async (req, res) => {
    const data = {
        id: req.params.id
      };
    const result = await service.GetLesson(data, res);
    
    res.status(200).send({
        success: true,
        data: result,
        message: "Lessons fetched successfully",
      });
  });
}