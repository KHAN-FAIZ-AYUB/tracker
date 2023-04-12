const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();
router.route('/').get((req,res,next)=>{
console.log("process.env.FIREBASE_SERVER_KEY",process.env.FIREBASE_SERVER_KEY)  
    res.status(200).json({success:"meessage",token:process.env.FIREBASE_SERVER_KEY})
})

router.route("/signup").post(userController.signUp);

router.route("/login").post(userController.signIn);

module.exports = router;
