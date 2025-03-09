import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Ensure DATABASE_URL is defined
const MONGO_URL: string = process.env.DATABASE_URL || "";

if (!MONGO_URL) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(" MongoDB connected successfully");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${(err as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
