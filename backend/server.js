import "./config/envConfig.js";

import app from "./app.js";
import { ConnectDb } from "./db/db.js";
import { v2 as cloudinary } from "cloudinary";
// MongoDb Connect
ConnectDb();

app.get("/", (req, res) => {
  res.send("Hi");
});
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});
