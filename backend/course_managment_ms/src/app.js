const express = require('express');
const app = express();

const courseRouter = require('./routes/course.route')

app.use(express.json());

app.use('/api', courseRouter);

module.exports = app;