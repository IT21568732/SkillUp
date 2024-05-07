const CourseService = require('../services/courseService')
const {SubscribeMessage} = require('../utils/index.utils')

module.exports = (app, channel) => {
    const service = new CourseService();
    const baseUrl = '/course'

    SubscribeMessage(channel, service)

    app.post(`${baseUrl}/create_course`, async (req, res) => {
        const result = await service.CreateCourse(req.body, res);
        res.send(result);
    });
}