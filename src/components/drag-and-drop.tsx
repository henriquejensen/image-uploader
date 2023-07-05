import Image from "next/image";
import React from "react";

const defaultImage = "/default.svg";

function DragAndDrop() {
  return (
    <>
      <Image
        src={defaultImage}
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
  );
}

export default DragAndDrop;
