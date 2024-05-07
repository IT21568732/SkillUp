const express = require("express");
const app = express();
//tharusha
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://1234567:RNTlODZafCDL6Ybh@cluster0.utm68bw.mongodb.net/demo")

app.get('/',(req,res)=>{
    res.send("main endpoint");
})

const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`Course_ms---Up and Running on port ${PORT}`)
})