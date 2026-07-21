import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDatabase = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_DB);
    console.log("DataBase Connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectDatabase;
