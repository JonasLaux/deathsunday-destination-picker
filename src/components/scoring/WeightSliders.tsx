"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { DEFAULT_WEIGHTS } from "@/lib/constants";
import type { WeightConfig } from "@/types";

interface WeightSlidersProps {
  weights: WeightConfig;
  onChange: (weights: WeightConfig) => void;
}

export function WeightSliders({ weights, onChange }: WeightSlidersProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsOpen(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsOpen(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  function set(key: keyof WeightConfig, value: number) {
    onChange({ ...weights, [key]: value });
  }

  function reset() {
    onChange({ ...DEFAULT_WEIGHTS });
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-neon-red" />
          Weight Preferences
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4 flex flex-col gap-4">
          <Slider
            label="Flight Price"
            value={weights.flightPrice}
            onChange={(v) => set("flightPrice", v)}
          />
          <Slider
            label="Accommodation"
            value={weights.accommodation}
            onChange={(v) => set("accommodation", v)}
          />
          <Slider
            label="Beer Price"
            value={weights.beerPrice}
            onChange={(v) => set("beerPrice", v)}
          />
          <Slider
            label="Nightlife"
            value={weights.nightlife}
            onChange={(v) => set("nightlife", v)}
          />
          <Slider
            label="Weather"
            value={weights.weather}
            onChange={(v) => set("weather", v)}
          />
          <Slider
            label="Culture"
            value={weights.culture}
            onChange={(v) => set("culture", v)}
          />

          <button
            onClick={reset}
            className="flex items-center gap-2 text-xs text-muted hover:text-foreground transition-colors self-end pt-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}
