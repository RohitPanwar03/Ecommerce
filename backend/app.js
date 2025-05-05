import cookieParser from "cookie-parser";
import express from "express";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

export default app;
