const express = require('express');
const expressApp = require('./app')
const dotenv = require("dotenv")
const connectDB = require('./config/db')
const {CreateChannel} = require("./utils/index.utils")

const PORT = process.env.PORT || 8001;

const StartServer = async() => {

    dotenv.config();
    const app = express()

    //connect to db
    connectDB();

    // //! Create channel
    const channel = await CreateChannel();

    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`Course Management Microservice running on ${PORT}`);
      });
}

StartServer();

