const cloudinary = require("cloudinary").v2
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

module.exports = cloudinary;

// const uploadFile = async(filePath) => {

//     try{
//         const result = await cloudinary.uploader.upload(filePath);
//         console.log(result)
//         return result;
//     }catch(error){
//         console.log(error)
//     }
// }