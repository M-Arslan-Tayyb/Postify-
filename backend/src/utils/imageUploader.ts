import cloudinary from "../config/cloudinary";

export const uploadImageToCloudinary = async (filePath: string, folder: string, height?: number, quality?: number) => {
  try {
    const options: Record<string, any> = { folder, resource_type: "auto" };
    if (height) options.height = height;
    if (quality) options.quality = quality;

    console.log("Uploading file to Cloudinary:", filePath);

    const result = await cloudinary.uploader.upload(filePath, options);
    console.log(" Upload successful:", result);

    return result;
  } catch (error) {
    console.error(" Error uploading to Cloudinary:", error);
    throw error;
  }
};
