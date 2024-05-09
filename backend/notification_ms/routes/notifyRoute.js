const express = require("express");
const router = express.Router();
const NotifyController = require("../controllers/notificationController");

router.post("/email", NotifyController.sendNotification);

module.exports = router;