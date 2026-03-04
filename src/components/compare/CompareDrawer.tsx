"use client";

import { Bed, Beer, CloudRain, Music, Palette, Plane, Thermometer, Trophy, X } from "lucide-react";
import type { ScoredCity } from "@/types";

interface CompareDrawerProps {
  cities: ScoredCity[];
  compareIds: string[];
  onClear: () => void;
}

interface MetricRow {
  label: string;
  icon: React.ReactNode;
  getValue: (city: ScoredCity) => number;
  format: (val: number) => string;
  bestIsHighest: boolean;
}

const METRICS: MetricRow[] = [
  {
    label: "Flight",
    icon: <Plane size={14} />,
    getValue: (c) => c.flightPriceEur,
    format: (v) => `€${v}`,
    bestIsHighest: false,
  },
  {
    label: "Accommodation",
    icon: <Bed size={14} />,
    getValue: (c) => c.accommodationPerNight,
    format: (v) => `€${v}/night`,
    bestIsHighest: false,
  },
  {
    label: "Beer",
    icon: <Beer size={14} />,
    getValue: (c) => c.beerPriceEur,
    format: (v) => `€${v.toFixed(2)}`,
    bestIsHighest: false,
  },
  {
    label: "Nightlife",
    icon: <Music size={14} />,
    getValue: (c) => c.nightlifeRating,
    format: (v) => `${v}/5`,
    bestIsHighest: true,
  },
  {
    label: "Culture",
    icon: <Palette size={14} />,
    getValue: (c) => c.cultureRating,
    format: (v) => `${v}/5`,
    bestIsHighest: true,
  },
  {
    label: "Nov Temp",
    icon: <Thermometer size={14} />,
    getValue: (c) => c.novemberAvgTempC,
    format: (v) => `${v}°C`,
    bestIsHighest: true,
  },
  {
    label: "Rain Days",
    icon: <CloudRain size={14} />,
    getValue: (c) => c.novemberRainDays,
    format: (v) => `${v} days`,
    bestIsHighest: false,
  },
  {
    label: "Score",
    icon: <Trophy size={14} />,
    getValue: (c) => c.overallScore,
    format: (v) => v.toFixed(1),
    bestIsHighest: true,
  },
];

const REGION_COLORS: Record<string, string> = {
  "Eastern Europe": "bg-purple-500/20 text-purple-300",
  Balkans: "bg-orange-500/20 text-orange-300",
  Baltic: "bg-blue-500/20 text-blue-300",
  Mediterranean: "bg-cyan-500/20 text-cyan-300",
  Wildcard: "bg-pink-500/20 text-pink-300",
};

export function CompareDrawer({ cities, compareIds, onClear }: CompareDrawerProps) {
  const selected = compareIds
    .map((id) => cities.find((c) => c.id === id))
    .filter((c): c is ScoredCity => Boolean(c));

  const isVisible = selected.length > 0;

  return (
    <div
      className={[
        "fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-2xl",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-sm font-semibold text-foreground">
          Comparing {selected.length} {selected.length === 1 ? "city" : "cities"}
        </span>
        <button
          onClick={onClear}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          aria-label="Clear comparison"
        >
          <X size={18} />
        </button>
      </div>

      {/* City columns */}
      <div className="overflow-x-auto">
        <div className="flex min-w-0 px-4 py-4 gap-4">
          {/* Metric labels column */}
          <div className="flex flex-col gap-2 shrink-0 pt-14">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-1.5 text-xs text-muted-foreground h-8"
              >
                {m.icon}
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          {/* City data columns */}
          {selected.map((city) => (
            <div key={city.id} className="flex flex-col gap-2 flex-1 min-w-[120px]">
              {/* City header */}
              <div className="mb-2">
                <p className="font-semibold text-foreground text-sm truncate">{city.name}</p>
                <span
                  className={[
                    "inline-block text-xs px-2 py-0.5 rounded-full mt-1",
                    REGION_COLORS[city.region] ?? "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  {city.region}
                </span>
              </div>

              {/* Metric values */}
              {METRICS.map((metric) => {
                const value = metric.getValue(city);
                const allValues = selected.map((c) => metric.getValue(c));
                const best = metric.bestIsHighest
                  ? Math.max(...allValues)
                  : Math.min(...allValues);
                const isBest = value === best && selected.length > 1;

                return (
                  <div
                    key={metric.label}
                    className={[
                      "flex items-center h-8 px-2 rounded text-sm font-medium transition-colors",
                      isBest
                        ? "text-red-400 bg-red-500/10"
                        : "text-foreground",
                    ].join(" ")}
                  >
                    {metric.format(value)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
