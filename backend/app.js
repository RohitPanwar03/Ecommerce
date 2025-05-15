import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./Router/userRoutes.js";
import productRouter from "./Router/productRoutes.js";
import orderRouter from "./Router/orderRoute.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import paymentRouter from "./Router/paymentRoute.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(cors({
    origin: "https://ecommerce-sigma-amber.vercel.app", 
    credentials: true,
  }));
app.use(fileUpload());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);

app.use(errorMiddleware);

export default app;
