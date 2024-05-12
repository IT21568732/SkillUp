const express = require('express');
const cors = require("cors")
const Authentication = require('../src/middlewares/Authentication')

const CourseRoute = require('./routes/course.route');
const QuizRoute = require('./routes/quiz.route')
const bodyParser = require('body-parser');
const LessonRoute = require('./routes/lesson.route');
const appEvents = require('./middlewares/app-events');


module.exports = async (app, channel)=> {
    app.use(express.json());
    app.use(cors());
    
    app.use(bodyParser.urlencoded({extended: true}))

    //listen to events
    // appEvents(app)

    // app.use(Authentication)
    CourseRoute(app, channel)
    LessonRoute(app, channel)
    QuizRoute(app, channel)

}
