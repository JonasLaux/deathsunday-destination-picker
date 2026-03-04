"use client";

import { X } from "lucide-react";
import type { FilterState } from "@/types";
import { REGIONS, DEFAULT_FILTERS } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Slider } from "@/components/ui/Slider";

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onFiltersChange }: FilterBarProps) {
  function toggleRegion(region: FilterState["regions"][number]) {
    const next = filters.regions.includes(region)
      ? filters.regions.filter((r) => r !== region)
      : [...filters.regions, region];
    onFiltersChange({ ...filters, regions: next });
  }

  function isActive() {
    return (
      filters.regions.length > 0 ||
      filters.maxFlightPrice !== DEFAULT_FILTERS.maxFlightPrice ||
      filters.maxAccommodation !== DEFAULT_FILTERS.maxAccommodation ||
      filters.minNightlife !== DEFAULT_FILTERS.minNightlife ||
      filters.directFlightOnly !== DEFAULT_FILTERS.directFlightOnly
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-card border border-border rounded-xl p-4">
      {/* Region multi-select */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted font-medium">Region</span>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map((region) => (
            <Badge
              key={region}
              region={region}
              onClick={() => toggleRegion(region)}
              active={filters.regions.includes(region)}
            />
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Slider
          label="Max flight price (€)"
          value={filters.maxFlightPrice}
          onChange={(v) => onFiltersChange({ ...filters, maxFlightPrice: v })}
          min={0}
          max={500}
          step={10}
        />
        <Slider
          label="Max accommodation (€/night)"
          value={filters.maxAccommodation}
          onChange={(v) => onFiltersChange({ ...filters, maxAccommodation: v })}
          min={0}
          max={200}
          step={5}
        />
      </div>

      {/* Min nightlife */}
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted font-medium">Min nightlife</span>
        <div className="flex gap-2">
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <button
              key={n}
              onClick={() => onFiltersChange({ ...filters, minNightlife: n })}
              className={`px-2.5 py-1 rounded-lg text-sm border transition-all duration-200
                ${filters.minNightlife === n
                  ? "bg-gold/20 border-gold/40 text-gold"
                  : "bg-transparent border-border text-muted hover:border-gold/30 hover:text-gold"
                }`}
            >
              {"★".repeat(n)}
            </button>
          ))}
        </div>
      </div>

      {/* Direct flight toggle + clear */}
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.directFlightOnly}
            onChange={(e) => onFiltersChange({ ...filters, directFlightOnly: e.target.checked })}
            className="accent-neon-red w-4 h-4"
          />
          <span className="text-sm text-muted">Direct flights only</span>
        </label>

        {isActive() && (
          <button
            onClick={() => onFiltersChange(DEFAULT_FILTERS)}
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-neon-red transition-colors duration-200"
          >
            <X className="w-3.5 h-3.5" />
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
