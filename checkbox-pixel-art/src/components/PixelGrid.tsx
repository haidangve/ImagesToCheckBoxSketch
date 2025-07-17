// src/components/PixelGrid.tsx
"use client";

type Props = {
  imageData: ImageData;
  threshold?: number;
};

export default function PixelGrid({ imageData, threshold = 128 }: Props) {
  const size = imageData.width;

  const toGrayscale = (r: number, g: number, b: number) =>
    0.3 * r + 0.59 * g + 0.11 * b;

  const pixels = Array.from({ length: imageData.data.length / 4 }, (_, i) => {
    const idx = i * 4;
    const r = imageData.data[idx];
    const g = imageData.data[idx + 1];
    const b = imageData.data[idx + 2];
    return toGrayscale(r, g, b) < threshold;
  });

  return (
    <div className="overflow-auto border rounded-lg p-4 max-w-full">
      <div
        className="grid gap-[2px] justify-center"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          width: `${Math.min(size * 16, 512)}px`, // limit width
        }}
      >
        {pixels.map((isDark, idx) => (
          <input
            key={idx}
            type="checkbox"
            checked={isDark}
            readOnly
            className="w-4 h-4 accent-blue-600"
          />
        ))}
      </div>
    </div>
  );
}
