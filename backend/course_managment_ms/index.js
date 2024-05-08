const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const Course = require("./models/courseModel")

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PORT = 4000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    
    app.listen(PORT, () => {
        console.log(`Course_ms---Up and Running on port ${PORT}`);
    });
    console.log('MongoDB connected')
  })
  .catch(error => console.error('Failed to connect to MongoDB:', error));

//create course
app.post("/course",async(req,res)=>{
    console.log(req.body)
    //res.send("testing");
    try {
        const {cname,cid,cdescription,cyear,ccredit} = req.body;

        const course = await Course.findOne({cid});
        if(!course){
            const newCourse = new Course({cname,cid,cdescription,cyear,ccredit}); 
            await newCourse.save();
        
            res.status(201).send('Course created successfully');
        }else{
            res.status(409).send('Course already exists.');
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).send('Error Course creation.');
    }
});

//get all the courses
app.get("/courses", async (req, res) => {
    try {
        const courses = await Course.find()

        res.status(200).send(courses);

    } catch (error) {
        res.status(500).send( 'Unable to get Courses');
    }
});

//get course by id
app.get("/course/:id", async (req, res) => {
    //res.send(req.params.id);
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            res.status(200).send(course);
        } else {
            res.status(404).send("Course not found");
        }

    } catch (error) {
        res.status(500).send( 'Unable to get the Course');
    }
});

//main end point
app.get('/',(req,res)=>{
    res.send("main endpoint");
})

