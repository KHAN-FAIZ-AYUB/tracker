const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");

const JWT_SECRET = "my_secret_token_for_jwt";

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
    fcmIdToken: req.body.token,
    phone: req.body.phone,
  });
  user.password = undefined;
  res.status(201).json({
    status: "success",
    user,
    token: signToken(user._id),
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      error: "Please provide email and password!",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  req.user = user;

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).json({
      error: "Incorrect email or password",
    });
  }
  user.fcmIdToken = req.body?.fcmToken;
  user.save();

  res.status(200).json({
    status: "success",
    token: signToken(user._id),
    user,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) getting token if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({
      error: "You are not logged in! Please log in to get access",
    });
  }
  // 2) verify the token

  const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

  // 3) check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    res.status(401).json({
      error: "The user belonging to this token does no longer exist",
    });
  }

  req.user = currentUser;

  next();
});
