import app from "./app.js";
import dotenv from "dotenv";
import { ConnectDb } from "./db/db.js";
import userRouter from "./Router/userRoutes.js";
import productRouter from "./Router/productRoutes.js";

// Configure Dotenv
dotenv.config({
  path: "./config.env",
});

// MongoDb Connect
ConnectDb();

app.get("/", (req, res) => {
  res.send("Hi");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
