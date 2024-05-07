const express = require("express");
const app = express();
//tharusha
const mongoose = require("mongoose");
require("dotenv").config();

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
  app.post("/course",(req,res)=>{
    //dfgdfg
  })


app.get('/',(req,res)=>{
    res.send("main endpoint");
})

