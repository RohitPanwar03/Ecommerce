import { User } from "../model/UserModel.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import { generateToken } from "../utils/jwtToken.js";
import { v2 as cloudinary } from "cloudinary";

// Register User Controller
export const registerController = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "Avatar",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new errorHandler(400, "All fields (name, email, password) are required")
    );
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new errorHandler(401, "User with same Email already exists"));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  generateToken(user, 200, res, "User Created Successfully");
});

// Login User Controller
export const LoginController = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new errorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler(401, "User does not Exist"));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new errorHandler(401, "Invalid Credentials"));
  }

  generateToken(user, 200, res, "login Successfully");
});

// Get Logged in user Details
export const getMyDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Logout Useer
export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Update User Details
export const updateUserDetails = catchAsyncError(async (req, res, next) => {
  const newDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user._id);
    await cloudinary.uploader.destroy(user.avatar.public_id);

    const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "Avatar",
      width: 150,
      crop: "scale",
    });

    newDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  await User.findByIdAndUpdate(req.user._id, newDetails, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
  });
});

// Delete User
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new errorHandler(404, "User Not Found with this Id"));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

// Update User Role ---Admin
export const updateUserRole = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    success: true,
    message: `User role updated !`,
  });
});

// Update user password
export const updateUserPassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new errorHandler(401, "Please Login to Access this Resource"));
  }

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    return next(new errorHandler(400, "Please enter the Correct Password"));
  }

  if (newPassword !== confirmPassword) {
    return next(new errorHandler(400, "Confirm Password Doesn't match"));
  }

  user.password = newPassword;
  await user.save();

  generateToken(user, 200, res, "Password Updated Successfully !");
});

// Get all Users---- Admin
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single Users---- Admin
export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new errorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  if (!email) {
    return next(new errorHandler(400, "Please enter your email"));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  console.log(user);
  if (!user) {
    return next(
      new errorHandler(404, "Email does not exist"),
      console.log(error)
    );
  }
  await UpdatePassword({
    user,
    oldPassword,
    newPassword,
    confirmPassword,
    res,
    next,
  });
});

const UpdatePassword = async ({
  user,
  oldPassword,
  newPassword,
  confirmPassword,
  res,
  next,
}) => {
  const isMatched = await user.comparePassword(oldPassword);
  if (!isMatched) {
    return next(new errorHandler(400, "Please enter the Correct Password"));
  }

  if (newPassword !== confirmPassword) {
    return next(new errorHandler(400, "Confirm Password Doesn't match"));
  }

  user.password = newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Updated Successfully",
  });
};
