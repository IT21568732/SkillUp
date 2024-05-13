const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    courseId: {
        type:Schema.Types.ObjectId,
        ref: 'Course',
        require: true
    },
    title: {
        type: String,
        require: true
    },
    lessonDes: {
        type: String,
        require: true
    },
    video: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Lesson", LessonSchema)