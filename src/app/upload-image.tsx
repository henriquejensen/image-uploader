"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState("/default.svg");

  const handleImageUpload = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

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

      setSelectedImage(url);
    },
    []
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-72 h-72 bg-slate-100 md:w-80 md:h-80">
        <Image src={selectedImage} fill alt="Upload" priority className="p-7" />
      </div>

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
      file:cursor-pointer
      mt-8"
        />
      </label>
    </div>
  );
}
