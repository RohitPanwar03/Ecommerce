import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  processPaymentController,
  sendStripeKey,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/process", isAuthenticated, processPaymentController);
router.get("/stripekey", isAuthenticated, sendStripeKey);

export default router;
