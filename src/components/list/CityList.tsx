"use client";

import type { ScoredCity } from "@/types";
import { CityCard } from "./CityCard";

interface CityListProps {
  cities: ScoredCity[];
  userName: string;
  onToggleVote: (cityId: string) => void;
  onToggleCompare: (cityId: string) => void;
  compareIds: string[];
  getVoteCount: (cityId: string) => number;
  hasVoted: (cityId: string) => boolean;
  getVoters: (cityId: string) => string[];
}

export function CityList({
  cities,
  userName,
  onToggleVote,
  onToggleCompare,
  compareIds,
  getVoteCount,
  hasVoted,
  getVoters,
}: CityListProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        {cities.length} {cities.length === 1 ? "destination" : "destinations"} found
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cities.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            userName={userName}
            onToggleVote={onToggleVote}
            onToggleCompare={onToggleCompare}
            isComparing={compareIds.includes(city.id)}
            getVoteCount={getVoteCount}
            hasVoted={hasVoted}
            getVoters={getVoters}
          />
        ))}
      </div>
    </div>
  );
}
