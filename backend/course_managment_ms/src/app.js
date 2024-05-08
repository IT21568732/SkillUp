const express = require('express');
const cors = require("cors")

const CourseRoute = require('./routes/course.route');
const bodyParser = require('body-parser');


module.exports = async (app, channel)=> {
    app.use(express.json());
    app.use(cors());
    
    app.use(bodyParser.urlencoded({extended: true}))

    CourseRoute(app, channel)

}
