const FCM = require("fcm-node");
const catchAsync = require("../utils/catchAsync");

// const serverKey =
//   "AAAAcIg1xDs:APA91bGjHWWr-5UyJlCmr1JjKSZZc8tnFlGoqCLntDOW7e8xjbZglLQhfKdi1B8j2JsmUME6vXTkQEOhL8jU9BGnBHhyIPMPraEwDtz_6VMU8iptIx8FJNGmu0l6zJk6aOnHB-r1gccK";
// const serverKey = process.env.FIREBASE_SERVER_KEY;
// console.log("serverKey",serverKey)
// const fcm = new FCM(serverKey);

exports.sendPushNotification = catchAsync(async (req, res, next) => {
  // const serverKey =
  // "AAAAcIg1xDs:APA91bGjHWWr-5UyJlCmr1JjKSZZc8tnFlGoqCLntDOW7e8xjbZglLQhfKdi1B8j2JsmUME6vXTkQEOhL8jU9BGnBHhyIPMPraEwDtz_6VMU8iptIx8FJNGmu0l6zJk6aOnHB-r1gccK";
// const serverKey = ;
// console.log("serverKey",serverKey)
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
