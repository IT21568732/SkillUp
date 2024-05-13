const express = require("express");
const router = express.Router();
const { sendEmailNotification, sendSMSNotification } = require("../controllers/notificationController");

router.post("/email", sendEmailNotification);
router.post("/sms", sendSMSNotification);


module.exports = router;