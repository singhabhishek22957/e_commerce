import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const storage = new multer.memoryStorage();

const handleImageUpload = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
};

const upload = multer({ storage });

export { handleImageUpload, upload };
