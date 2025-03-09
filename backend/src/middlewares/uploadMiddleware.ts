import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Ensure the uploads directory exists
const uploadPath = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it doesn't exist
}

// ✅ Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// ✅ Multer Upload Middleware (Accepts Image Files Only)
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file) {
      return cb(null, true); // ✅ Allow no file
    }

    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed (JPG, JPEG, PNG)!"));
  },
});

export default upload;
