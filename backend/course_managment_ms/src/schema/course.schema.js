const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseName: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    duration: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    instructor: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Course", CourseSchema)