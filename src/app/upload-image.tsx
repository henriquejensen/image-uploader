"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState("/next.svg");

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
      <div className="relative w-96 h-96 bg-white">
        <Image src={selectedImage} fill alt="Upload" priority />
      </div>

      <input
        type="file"
        className="mt-8 rounded-md border-2 border-gray-200 p-4"
        onChange={handleImageUpload}
      />
    </div>
  );
}
