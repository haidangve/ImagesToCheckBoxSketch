"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import PixelGrid from "@/components/PixelGrid";

export default function Home() {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 flex flex-col items-center justify-center px-4 text-white">
      <h1 className="text-5xl font-extrabold mb-2 drop-shadow-md text-center">
        ✨ Checkbox Sketch
      </h1>
      <p className="text-lg text-center mb-8 text-purple-200">
        Transform your images into beautiful checkbox art with AI-powered
        conversion
      </p>

      <ImageUploader onImageProcessed={setImageData} />

      {imageData && (
        <div className="mt-10 bg-white p-6 rounded-xl shadow-2xl max-w-full overflow-auto">
          <PixelGrid imageData={imageData} />
        </div>
      )}
    </main>
  );
}
