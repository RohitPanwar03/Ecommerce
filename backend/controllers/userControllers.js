import { User } from "../model/UserModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.find({ email });
    if (existingUser) {
      res.status(401).json({
        success: false,
        message: "User Already exist with Same Email",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
