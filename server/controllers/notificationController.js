const FCM = require("fcm-node");
const catchAsync = require("../utils/catchAsync");

exports.sendPushNotification = catchAsync(async (req, res, next) => {
const fcm = new FCM(process.env.FIREBASE_SERVER_KEY);
  const message = {
    to: req.user?.fcmIdToken,
    collapse_key: "TEST",
    notification: {},
  };
  fcm.send(message, () => {
    console.log("sent Notification successfully");
  });

  res.send({});
});
