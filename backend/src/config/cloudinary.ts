import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Configure Cloudinary
export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME!,
      api_key: process.env.API_KEY!,
      api_secret: process.env.API_SECRET!,
    });
    console.log(" Cloudinary Connected Successfully");
  } catch (error) {
    console.error("Cloudinary Connection Failed:", error);
  }
};

export default cloudinary; 
