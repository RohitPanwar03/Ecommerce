import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { Product } from "../model/productModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import apifeatures from "../utils/apifeatures.js";
import { JSONCookie } from "cookie-parser";

// Create Product
export const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    message: "New Product Created !",
  });
});

// GetAll Products with Filter
export const AllProductsWithFilter = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeature = new apifeatures(Product.find(), req.query)
    .search()
    .filter();

  const filteredQuery = apiFeature.query.clone(); // Save filtered (but unpaginated) query

  apiFeature.pagination(resultPerPage);

  const products = await apiFeature.query;
  const filteredProductCount = await filteredQuery.countDocuments();

  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductCount,
  });
});

// Get All products --- Admin
export const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Single Product
export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new errorHandler(404, `Cannot Find Product with ID : ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product
export const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler(404, "Product not found"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
    product,
  });
});

// Delete Product ----Admin
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler(404, "Product not found"));
  }

  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Post or Update Review
export const productReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.forEach(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review Added Successfully",
  });
});

// Get All Reviews of a product
export const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new errorHandler(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete a Review
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new errorHandler(404, "Product not found"));
  }

  const reviews = product.reviews.filter((rev) => {
    rev._id.toString() !== req.query.id.toString();
  });

  let avg = 0;
  reviews.forEach((rev) => {
    avg += reviews.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});
