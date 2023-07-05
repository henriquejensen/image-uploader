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
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <main className="flex flex-col items-center shadow-2xl p-5">
          <h1 className="font-bold text-center text-lg">Upload your image</h1>
          <p className="text-center text-gray-500 text-sm mb-9 mt-3">
            File should be Jpeg, Jpg, Png or Svg
          </p>
          <UploadImage />
        </main>
      </div>
      <footer className="flex justify-center items-end w-full h-24 p-3 absolute bottom-0">
        created by{"\u00A0"}
        <a href="https://github.com/henriquejensen" target="_blank">
          <b>Henrique Jensen</b>
        </a>
      </footer>
    </>
  );
}
