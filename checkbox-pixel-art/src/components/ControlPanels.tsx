// src/components/ControlsPanel.tsx
"use client";

type Props = {
  gridSize: number;
  setGridSize: (n: number) => void;
  threshold: number;
  setThreshold: (n: number) => void;
};

export default function ControlsPanel({
  gridSize,
  setGridSize,
  threshold,
  setThreshold,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <label className="flex items-center gap-2">
        Grid:
        <input
          type="number"
          min={8}
          max={128}
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
          className="border px-2 py-1 w-20"
        />
      </label>
      <label className="flex items-center gap-2">
        Threshold:
        <input
          type="range"
          min={0}
          max={255}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
        <span className="w-8 text-right">{threshold}</span>
      </label>
    </div>
  );
}
