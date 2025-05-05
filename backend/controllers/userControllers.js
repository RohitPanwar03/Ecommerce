import { User } from "../model/UserModel.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import { generateToken } from "../utils/jwtToken.js";

// Register User Controller
export const registerController = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new errorHandler(401, "User with same Email already Exist"));
  }

  const user = await User.create({ name, email, password, avatar });

  generateToken(user, 200, res, "User Created Successfully");
});

// Login User Controller
export const LoginController = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const UserExist = await User.findOne({ email });

  if (!UserExist) {
    return next(new errorHandler(401, "User does not Exist"));
  }

  const isPasswordMatch = await UserExist.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new errorHandler(401, "Invalid Credentials"));
  }

  generateToken(UserExist, 200, res, "login Successfully");
});
