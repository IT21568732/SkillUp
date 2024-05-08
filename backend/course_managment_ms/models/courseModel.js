const mongoose = require("mongoose");

const Course = mongoose.model("Course",{
    cname:{
        type:String,required:true
    },
    cid:{
        type:String,required:true
    },
    cdescription:{
        type:String,required:true
    },
    cyear:{
        type:String,required:true
    },
    ccredit:{
        type:String,required:true
    }
});
module.exports = Course;


// const mongoose = require("mongoose");

// const schema = mongoose.schema;
// const courseSchema = new schema({
//     cname:{
//         type:String,required:true
//     },
//     cid:{
//         type:String,required:true
//     },
//     cdescription:{
//         type:String,required:true
//     },
//     cyear:{
//         type:String,required:true
//     },
//     ccredit:{
//         type:String,required:true
//     }
// })

// const Course = mongoose.model("Course",courseSchema);
// module.exports = Course;
