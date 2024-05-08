const express = require('express');
const cors = require("cors")
const Authentication = require('../src/middlewares/Authentication')

const CourseRoute = require('./routes/course.route');
const bodyParser = require('body-parser');
const LessonRoute = require('./routes/lesson.route');


module.exports = async (app, channel)=> {
    app.use(express.json());
    app.use(cors());
    
    app.use(bodyParser.urlencoded({extended: true}))

    // app.use(Authentication)
    CourseRoute(app, channel)
    LessonRoute(app, channel)

}
