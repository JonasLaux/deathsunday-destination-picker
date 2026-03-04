"use client";
import dynamic from "next/dynamic";
import type { ScoredCity } from "@/types";

const MapView = dynamic(() => import("./MapView").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-background flex items-center justify-center text-muted">
      Loading map...
    </div>
  ),
});

interface MapContainerProps {
  cities: ScoredCity[];
  votes: Record<string, Record<string, boolean>>;
  userName: string;
  onToggleVote: (cityId: string, userName: string) => void;
  onToggleCompare: (cityId: string) => void;
  compareIds: string[];
  getVoteCount: (cityId: string) => number;
  hasVoted: (cityId: string, userName: string) => boolean;
}

export function MapContainer(props: MapContainerProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-border">
      <MapView {...props} />
    </div>
  );
}
