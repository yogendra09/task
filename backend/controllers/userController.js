const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

const { sendtoken } = require("../utils/sendToken");

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ status:true, data:users});
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.id);
  if(!user) return next(new ErrorHandler("user not exist", 401));
  const senduser = {name:user.name,email:user.email,phone:user.phone,role:user.role,};
  res.status(200).json({ status:true,data:senduser});
});

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone , password } = req.body;
  if (!name || !email || !phone ||!password) {
    return next(new ErrorHandler("please fill all fields", 400));
  }
  
  const newUser = new User(req.body);

  await newUser.save();
  sendtoken(newUser, 200, res);
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("user not exist", 401));
  const isMatch = user.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("invalid credential"), 403);
  sendtoken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  const option = {
    exipres: new Date(),
    httpOnly: true,
    secure:true
  };
  res
    .status(200)
    .cookie("token",'', option)
    .json({ message: "user logout!",status:true });
});






