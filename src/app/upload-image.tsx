"use client";

import Image from "next/image";
import React, { useState } from "react";

const defaultImage = "/default.svg";

const upLoadImage = async (
  file: File | undefined,
  callBack: (file: string) => void
) => {
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const { url } = await response.json();

  callBack(url);
};

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const handleImageUpload = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      upLoadImage(file, setSelectedImage);
    },
    []
  );

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = React.useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    upLoadImage(file, setSelectedImage);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative w-72 h-72 bg-slate-100 md:w-80 md:h-80 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImage === defaultImage ? (
          <>
            <Image
              src={selectedImage}
              fill
              alt="Drag and drop your image here"
              priority
              className="p-7"
            />
            <span className="absolute bottom-1 right-0 left-0">
              <span className="text-sm text-slate-500">
                Drag and drop your image here
              </span>
            </span>
          </>
        ) : (
          <Image src={selectedImage} fill alt="Image uploaded" priority />
        )}
      </div>
      <span className="text-sm text-slate-500 my-8">Or</span>
      <label className="block">
        <span className="sr-only">Choose profile photo</span>
        <input
          type="file"
          onChange={handleImageUpload}
          className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-400
      file:cursor-pointer"
        />
      </label>
    </div>
  );
}
