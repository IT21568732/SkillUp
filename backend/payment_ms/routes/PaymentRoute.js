const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");

router.post(
  "/create-checkout-session",
  PaymentController.CreateCheckoutSession
);
router.get("/session-status", PaymentController.getCheckoutSession);

module.exports = router;
