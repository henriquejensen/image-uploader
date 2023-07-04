import UploadImage from "./upload-image";
import { NextApiRequest, NextApiResponse } from "next";

export function handler(request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({
    body: request.body,
    query: request.query,
    cookies: request.cookies,
  });
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">Upload your image</h1>
      <p className="text-center text-gray-500">
        File should be Jpeg, Jpg, Png or Svg
      </p>
      <UploadImage />
    </main>
  );
}
