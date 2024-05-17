const express = require("express");
const router = express.Router();
const {
  sendEmailNotification,
  sendEmailNotification2,
  sendEmailNotification3,
  sendSMSNotification,
} = require("../controllers/notificationController");

router.post("/email", sendEmailNotification);
router.post("/email2", sendEmailNotification2);
router.post("/email3", sendEmailNotification3);
router.post("/sms", sendSMSNotification);

module.exports = router;
