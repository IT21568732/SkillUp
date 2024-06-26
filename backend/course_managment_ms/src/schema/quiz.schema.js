const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctOptionIndex: { type: Number, required: true },
});

const QuizSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    require: true,
  },
  quizName:{type:String, required:true},
  questions: { type: [QuestionSchema], required: true },
});

module.exports = mongoose.model("Quiz", QuizSchema);
