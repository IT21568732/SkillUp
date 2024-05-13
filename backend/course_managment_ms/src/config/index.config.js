require('dotenv').config();

module.exports = {
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
    EXCHANGE_NAME: "ONLINE_COURSE",
    AUTH_ROUTING_KEY: "AUTH_SERVICE",
    COURSE_ROUTING_KEY: "COURSE_SERVICE",
    QUEUE_NAME:'COURSE_QUEUE'
  };