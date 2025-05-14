import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { Product } from "../model/productModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";

// Create Product
export const createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.uploader.upload(images[i], {
      folder: "Products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
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
  const page = Number(req.query.page) || 1;

  const queryObject = {};

  // Search by keyword in name (case-insensitive)
  if (req.query.keyword) {
    queryObject.name = { $regex: req.query.keyword, $options: "i" };
  }

  // Filter by category
  if (req.query.category) {
    queryObject.category = req.query.category;
  }

  // Filter by price range using price[gte] and price[lte]
  if (req.query.price) {
    queryObject.price = {};
    if (req.query.price.gte) {
      queryObject.price.$gte = Number(req.query.price.gte);
    }
    if (req.query.price.lte) {
      queryObject.price.$lte = Number(req.query.price.lte);
    }
  }

  // Filter by minimum rating
  if (req.query.ratings) {
    queryObject.ratings = { $gte: Number(req.query.ratings) };
  }

  // Total product count (before filtering)
  const totalProducts = await Product.countDocuments();

  // Get filtered products without pagination
  const filteredProducts = await Product.find(queryObject);
  const filteredProductCount = filteredProducts.length;

  // Apply pagination to filtered results
  const products = await Product.find(queryObject)
    .limit(resultPerPage)
    .skip(resultPerPage * (page - 1));

  res.status(200).json({
    success: true,
    products,
    totalProducts,
    filteredProductCount,
    resultPerPage,
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

  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.uploader.destroy(product.images[i].public_id);
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "Products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
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

  const isReviewed = product.reviews.find(
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
