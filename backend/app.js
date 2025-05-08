import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(errorMiddleware);

export default app;
