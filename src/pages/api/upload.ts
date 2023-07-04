import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import { extname } from "path";

const storage = multer.diskStorage({
  destination: "./public/uploads/", // Set the destination folder for uploaded files
  filename: (req: any, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  }
})

// Configure Multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.svg'];

    const fileExtension = extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Define the API route handler
export const config = {
  api: {
    bodyParser: false, // Multer will handle the body parsing
  },
};

const uploadHandler = (req: any, res: any) => {
  try {
  upload.single("image")(req, res, (err: any) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    const url = `/uploads/${req.file.filename}`; // Assuming the uploads folder is accessible at the root level

    return res.status(200).json({ message: 'File uploaded successfully', url });
  })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error uploading file" });
  }
  
};

export default uploadHandler;
