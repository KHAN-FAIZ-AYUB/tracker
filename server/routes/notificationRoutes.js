const express = require("express");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .post(authController.protect, notificationController.sendPushNotification);

module.exports = router;
