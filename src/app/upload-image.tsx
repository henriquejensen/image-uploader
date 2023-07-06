"use client";

import FileUploadButton from "@/components/file-upload-button";
import DragAndDrop from "@/components/drag-and-drop";
import Image from "next/image";
import React, { useState } from "react";
import { postImage } from "@/services/post-image";
import Swal from "sweetalert2";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostImage = React.useCallback(async (file: File | undefined) => {
    try {
      setLoading(true);
      await postImage(file, setSelectedImage);
    } catch (error) {
      Swal.fire("Error uploading image, image size must be less than 1MB");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleImageUpload = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      handlePostImage(file);
    },
    [handlePostImage]
  );

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = React.useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];

      handlePostImage(file);
    },
    [handlePostImage]
  );

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(selectedImage);

    Swal.fire("Copied!", "Image URL copied to clipboard", "success");
  }, [selectedImage]);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading && (
        <h2 className="mb-3 font-bold text-blue-500">Uploading...</h2>
      )}
      <div
        className="relative w-72 h-72 bg-slate-100 md:w-80 md:h-80 text-center mb-8"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {selectedImage ? (
          <Image src={selectedImage} fill alt="Image uploaded" priority />
        ) : (
          <DragAndDrop />
        )}
      </div>

      {selectedImage ? (
        <div className="relative text-xs">
          <input
            type="text"
            value={selectedImage}
            readOnly
            className="w-72 md:w-80 border-1 border-solid bg-slate-100 rounded-lg p-3"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-0 bottom-0 right-2 bg-blue-500 text-white my-1 rounded-md px-1"
          >
            Copy
          </button>
        </div>
      ) : (
        <>
          <span className="text-sm text-slate-500 mb-8">Or</span>
          <FileUploadButton handleImageUpload={handleImageUpload} />
        </>
      )}
    </div>
  );
}
