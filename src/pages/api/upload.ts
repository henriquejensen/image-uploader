import multer, { Multer } from "multer";
import multers3 from "multer-s3";
import { extname } from "path";
import { S3 } from "@aws-sdk/client-s3";
import { Request, Response } from "express";

interface MyFile extends Express.Multer.File {
  location: string;
}
declare module "express" {
  interface Request {
    file: MyFile;
  }
}

const client = new S3({ region: process.env.AWS_REGION });

const storageProduction = () => multers3({
  s3: client,
  bucket: process.env.AWS_BUCKET_NAME as string,
  acl: "public-read",
  contentType: multers3.AUTO_CONTENT_TYPE,
  key: (req: Request, file, cb) => {
    const randomIntNumBetween1and10 = Math.floor(Math.random() * 10) + 1;
    const fileExtension = extname(file.originalname);
    cb(null, `${randomIntNumBetween1and10}${fileExtension}`);
  },
});

const storageDevelopment = () => multer.diskStorage({
  destination: "./public/uploads/", // Set the destination folder for uploaded files
  filename: (req: any, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`);
  }
})

// Configure Multer
const upload = multer({
  storage: process.env.NODE_ENV === "production" ? storageProduction() : storageDevelopment(),
  limits: { fileSize: 1024 * 1024 * 2 }, // 2 MB
  fileFilter: (_, file, cb) => {
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".svg"];

    const fileExtension = extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

// Define the API route handler
export const config = {
  api: {
    bodyParser: false, // Multer will handle the body parsing
  },
};

const uploadHandler = (request: Request, res: Response) => {
  try {
    upload.single("image")(request, res, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }

      let url = `http://localhost:3000/uploads/${request.file.filename}`

      if (process.env.NODE_ENV === "production") {
        url = request.file.location;
      }

      return res
        .status(200)
        .json({ message: "File uploaded successfully", url, env: process.env });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error uploading file" });
  }
};

export default uploadHandler;
