import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
 const connectDatabase = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_DB);
    console.log("DataBase Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDatabase;
