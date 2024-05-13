const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
    
    Learner_ID: { type: String, required: true },
    enrolledCourses: [
        {
            courseId: { type: String },
            progress: { type: Number, default: 0 },
            enrolledOn: { type: Date,required: false,default: Date.now}
        }
    ]
});

module.exports = mongoose.model('Learner', learnerSchema);
