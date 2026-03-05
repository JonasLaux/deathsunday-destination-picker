"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { ScoredCity } from "@/types";
import { CityMarker } from "./CityMarker";

interface MapViewProps {
  cities: ScoredCity[];
  votes: Record<string, Record<string, boolean>>;
  userName: string;
  onToggleVote: (cityId: string, userName: string) => void;
  onToggleCompare: (cityId: string) => void;
  compareIds: string[];
  getVoteCount: (cityId: string) => number;
  hasVoted: (cityId: string, userName: string) => boolean;
  getVoters: (cityId: string) => string[];
}

export function MapView({
  cities,
  userName,
  onToggleVote,
  onToggleCompare,
  compareIds,
  getVoteCount,
  hasVoted,
  getVoters,
}: MapViewProps) {
  // Determine top-voted city id (if any votes exist)
  const mostVotedId = cities.reduce<string | null>((topId, city) => {
    const count = getVoteCount(city.id);
    if (count === 0) return topId;
    if (topId === null) return city.id;
    return count > getVoteCount(topId) ? city.id : topId;
  }, null);

  // Cheapest 5 flight prices
  const sortedByFlight = [...cities]
    .sort((a, b) => a.flightPriceEur - b.flightPriceEur)
    .slice(0, 5)
    .map((c) => c.id);

  // Sorted by overall score for rank
  const sortedByScore = [...cities].sort(
    (a, b) => b.overallScore - a.overallScore
  );

  return (
    <MapContainer
      center={[46.5, 17.5]}
      zoom={4}
      style={{ width: "100%", height: "100%" }}
      className="bg-background"
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      <MarkerClusterGroup chunkedLoading>
        {cities.map((city) => {
          const rank = sortedByScore.findIndex((c) => c.id === city.id) + 1;
          return (
            <CityMarker
              key={city.id}
              city={city}
              rank={rank}
              isMostVoted={city.id === mostVotedId}
              isCheapFlight={sortedByFlight.includes(city.id)}
              userName={userName}
              onToggleVote={onToggleVote}
              onToggleCompare={onToggleCompare}
              isComparing={compareIds.includes(city.id)}
              getVoteCount={getVoteCount}
              hasVoted={hasVoted}
              getVoters={getVoters}
            />
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
