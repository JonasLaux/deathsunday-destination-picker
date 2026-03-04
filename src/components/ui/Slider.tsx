"use client";

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function Slider({ label, value, onChange, min = 0, max = 100, step = 1 }: SliderProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted">{label}</span>
        <span className="text-neon-red font-semibold tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
