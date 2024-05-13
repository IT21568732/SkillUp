const CourseService = require('../services/courseService')

module.exports = (app) => {
    const service = new CourseService();

    app.use('/app-events', async (req,res,next) => {
        const {payload} = req.body;

        service.SubscribeEvents(payload);

        console.log("====== course service receved Event ===");
        return res.status(200).json(payload)
    })
}