const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
    
    Learner_ID: { type: String, required: true },
    enrolledCourses: [
        {
            courseId: { type: String },
            progress: { type: Number,required:false, default: 0 },
            enrolledOn: { type: Date,required: false,default: Date.now}
        },
    ],
}, { timestamps: true }
);

module.exports = mongoose.model('Learner', learnerSchema);
