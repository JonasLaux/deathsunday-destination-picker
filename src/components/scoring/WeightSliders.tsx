"use client";

import { RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { DEFAULT_WEIGHTS } from "@/lib/constants";
import type { WeightConfig } from "@/types";

interface WeightSlidersProps {
  weights: WeightConfig;
  onChange: (weights: WeightConfig) => void;
  inline?: boolean;
}

export function WeightSliders({ weights, onChange, inline }: WeightSlidersProps) {
  function set(key: keyof WeightConfig, value: number) {
    onChange({ ...weights, [key]: value });
  }

  function reset() {
    onChange({ ...DEFAULT_WEIGHTS });
  }

  const sliders = (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-3">
        <Slider label="Flight Price" value={weights.flightPrice} onChange={(v) => set("flightPrice", v)} />
        <Slider label="Accommodation" value={weights.accommodation} onChange={(v) => set("accommodation", v)} />
        <Slider label="Beer Price" value={weights.beerPrice} onChange={(v) => set("beerPrice", v)} />
        <Slider label="Nightlife" value={weights.nightlife} onChange={(v) => set("nightlife", v)} />
        <Slider label="Weather" value={weights.weather} onChange={(v) => set("weather", v)} />
        <Slider label="Culture" value={weights.culture} onChange={(v) => set("culture", v)} />
      </div>
      <div className="flex justify-end mt-1">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>
    </>
  );

  if (inline) return sliders;

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      {sliders}
    </div>
  );
}
