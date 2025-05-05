export const catchAsyncError = (func) => async (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next());
};
