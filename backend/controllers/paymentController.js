import Stripe from "stripe";
import { catchAsyncError } from "../utils/catchAsyncErrors.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPaymentController = catchAsyncError(
  async (req, res, next) => {
    const { amount } = req.body;
    const paymentIntence = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: paymentIntence.client_secret,
    });
  }
);

export const sendStripeKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
