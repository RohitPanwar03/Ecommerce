import { Order } from "../model/orderModel.js";
import { Product } from "../model/productModel.js";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";
import { errorHandler } from "../utils/errorHandler.js";

// Create Order
export const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get Single Order Details
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new errorHandler(404, "Wrong Order Id"));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get My Order
export const getMyOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get All Orders ----Admin
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  const totalAmount = 0;

  orders.forEach((o) => (totalAmount += o.totalPrice));

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status and Stocks ---Admin
export const updateOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler(404, "Order not Found"));
  }

  if (order.orderStatus === "Delivered") {
    return next(
      new errorHandler(400, "You have Already Delivered this Order !")
    );
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStocks(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: true });
  res.status(200).json({
    success: true,
    message: `Order ${req.body.status} Successfully !`,
  });
});

// Update Stock on Order Status
const updateStocks = async (productId, quantity) => {
  const product = await Product.findById(productId);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

// Delete Order
export const deleteOrders = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler(404, "Order not Found"));
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
    message: "Order Deleted Successfully !",
  });
});
