export const catchAsyncError = (func) => async (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
