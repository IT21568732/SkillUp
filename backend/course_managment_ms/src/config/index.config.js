require('dotenv').config();

module.exports = {
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
    EXCHANGE_NAME: "course_service",
    AUTH_ROUTING_KEY: "Course"
  };