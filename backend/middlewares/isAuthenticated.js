import { User } from "../model/UserModel.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new errorHandler(401, "Token is Invalid or Expired"));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedToken.id);
  next();
});

export const authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorHandler(401, "Your are not Authorized to access this resource")
      );
    }
    next();
  };
};
