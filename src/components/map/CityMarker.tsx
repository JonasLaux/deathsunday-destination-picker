"use client";
import { useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { ScoredCity } from "@/types";
import { CityPopup } from "./CityPopup";

interface CityMarkerProps {
  city: ScoredCity;
  rank: number;
  isMostVoted: boolean;
  isCheapFlight: boolean;
  userName: string;
  onToggleVote: (cityId: string, userName: string) => void;
  onToggleCompare: (cityId: string) => void;
  isComparing: boolean;
  getVoteCount: (cityId: string) => number;
  hasVoted: (cityId: string, userName: string) => boolean;
  getVoters: (cityId: string) => string[];
}

function getMarkerColor(props: {
  rank: number;
  nightlifeRating: number;
  isCheapFlight: boolean;
  isMostVoted: boolean;
}): string {
  if (props.rank <= 3) return "#FF2D2D"; // neon-red: top overall score
  if (props.nightlifeRating === 5) return "#FF6B35"; // hot-orange: best nightlife
  if (props.isCheapFlight) return "#39FF14"; // neon-green: cheapest flight
  if (props.isMostVoted) return "#FFD700"; // gold: most voted
  return "#ededed"; // default white
}

export function CityMarker({
  city,
  rank,
  isMostVoted,
  isCheapFlight,
  userName,
  onToggleVote,
  onToggleCompare,
  isComparing,
  getVoteCount,
  hasVoted,
  getVoters,
}: CityMarkerProps) {
  const color = getMarkerColor({
    rank,
    nightlifeRating: city.nightlifeRating,
    isCheapFlight,
    isMostVoted,
  });

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: `<div style="
          width: 12px;
          height: 12px;
          background-color: ${color};
          border-radius: 50%;
          box-shadow: 0 0 6px 2px ${color}88, 0 0 12px 4px ${color}44;
          border: 1px solid ${color}cc;
        "></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -10],
      }),
    [color]
  );

  return (
    <Marker position={[city.lat, city.lng]} icon={icon}>
      <Popup
        className="city-popup"
        minWidth={220}
        maxWidth={260}
      >
        <CityPopup
          city={city}
          userName={userName}
          onToggleVote={onToggleVote}
          onToggleCompare={onToggleCompare}
          isComparing={isComparing}
          getVoteCount={getVoteCount}
          hasVoted={hasVoted}
          getVoters={getVoters}
        />
      </Popup>
    </Marker>
  );
}
