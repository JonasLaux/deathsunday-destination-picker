"use client";

import type { Region } from "@/types";

const regionColors: Record<Region, string> = {
  "Eastern Europe": "bg-neon-red/20 text-neon-red border-neon-red/30",
  "Balkans": "bg-hot-orange/20 text-hot-orange border-hot-orange/30",
  "Baltic": "bg-neon-green/20 text-neon-green border-neon-green/30",
  "Mediterranean": "bg-gold/20 text-gold border-gold/30",
  "Wildcard": "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

interface BadgeProps {
  region: Region;
  onClick?: () => void;
  active?: boolean;
}

export function Badge({ region, onClick, active }: BadgeProps) {
  return (
    <span
      onClick={onClick}
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
        transition-all duration-200
        ${regionColors[region]}
        ${active ? "ring-1 ring-current" : ""}
        ${onClick ? "cursor-pointer hover:opacity-80" : ""}
      `}
    >
      {region}
    </span>
  );
}
