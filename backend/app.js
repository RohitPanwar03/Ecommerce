import cookieParser from "cookie-parser";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(errorMiddleware);

export default app;
