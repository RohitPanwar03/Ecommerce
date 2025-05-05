import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connect to Database Successfully`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
