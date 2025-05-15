export const generateToken = async (user, statusCode, res, message) => {
  const token = user.getjwtToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: true,
  sameSite: "None", 
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
    token,
  });
};
