"use client";

import FileUploadButton from "@/components/file-upload-button";
import DragAndDrop from "@/components/drag-and-drop";
import Image from "next/image";
import React, { useState } from "react";
import { postImage } from "@/services/post-image";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageUpload = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      postImage(file, setSelectedImage);
    },
    []
  );

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = React.useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    postImage(file, setSelectedImage);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative w-72 h-72 bg-slate-100 md:w-80 md:h-80 text-center"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImage ? (
          <Image src={selectedImage} fill alt="Image uploaded" priority />
        ) : (
          <DragAndDrop />
        )}
      </div>
      <span className="text-sm text-slate-500 my-8">Or</span>
      <FileUploadButton handleImageUpload={handleImageUpload} />
    </div>
  );
}
