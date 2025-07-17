"use client";

import { useRef } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"; // optional: use icon lib

type Props = {
  onImageProcessed: (data: ImageData) => void;
};

export default function ImageUploader({ onImageProcessed }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      if (!reader.result) return;
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 32;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, size, size);
        const imageData = ctx.getImageData(0, 0, size, size);
        onImageProcessed(imageData);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-xl text-center shadow-lg">
      <div className="flex flex-col items-center justify-center gap-4">
        <ArrowUpTrayIcon className="w-10 h-10 text-purple-300" />
        <p className="font-semibold text-white text-lg">Upload an Image</p>
        <p className="text-sm text-purple-200">
          Drag and drop your image here, or click to browse
        </p>

        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="hidden"
        />

        <button
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-semibold shadow-md transition"
        >
          Choose Image
        </button>
        <p className="text-xs text-purple-300 mt-2">
          Supports: JPG, PNG, WebP, GIF
        </p>
      </div>
    </div>
  );
}
