import React from "react";

function FileUploadButton({
  handleImageUpload,
}: {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
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
  );
}

export default FileUploadButton;
