export const generateToken = async (user, statusCode, res, message) => {
  const token = user.getjwtToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "HEAD", "PATCH", "DELETE"],
    sameSite: "none", 
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
    token,
  });
};
