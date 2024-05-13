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
    },
    imageUrl: {
        type: String,
        require: true
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ]
})

module.exports = mongoose.model("Course", CourseSchema)