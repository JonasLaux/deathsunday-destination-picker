"use client";

import { useState, useMemo } from "react";
import { Map, List } from "lucide-react";
import { DEFAULT_WEIGHTS } from "@/lib/constants";
import type { WeightConfig } from "@/types";

import { useCities } from "@/hooks/useCities";
import { useScoring } from "@/hooks/useScoring";
import { useVotes } from "@/hooks/useVotes";
import { useUserIdentity } from "@/hooks/useUserIdentity";
import { useFilters } from "@/hooks/useFilters";
import { useCompare } from "@/hooks/useCompare";

import { Header } from "@/components/layout/Header";
import { WeightSliders } from "@/components/scoring/WeightSliders";
import { FilterBar } from "@/components/list/FilterBar";
import { SortDropdown } from "@/components/list/SortDropdown";
import { MapContainer } from "@/components/map/MapContainer";
import { CityList } from "@/components/list/CityList";
import { CompareDrawer } from "@/components/compare/CompareDrawer";
import { UserIdentity } from "@/components/voting/UserIdentity";

export default function Home() {
  // State
  const [weights, setWeights] = useState<WeightConfig>(DEFAULT_WEIGHTS);
  const [mobileView, setMobileView] = useState<"map" | "list">("list");

  // Hooks
  const { cities, loading } = useCities();
  const { userName, setUserName } = useUserIdentity();
  const { votes, toggleVote, getVoteCount, hasVoted } = useVotes();
  const { filters, setFilters, sortField, setSortField, filterAndSort } = useFilters();
  const { compareIds, toggleCompare, clearCompare } = useCompare();

  // Derived data
  const scoredCities = useScoring(cities, weights);
  const displayCities = useMemo(
    () => filterAndSort(scoredCities, getVoteCount),
    [scoredCities, filterAndSort, getVoteCount]
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header userName={userName} />

      {/* User identity modal */}
      <UserIdentity isOpen={!userName} onSetName={setUserName} />

      <div className="flex-1 flex flex-col overflow-hidden p-4 gap-4">
        {/* Controls */}
        <div className="flex flex-col gap-4">
          <WeightSliders weights={weights} onChange={setWeights} />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <FilterBar filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <SortDropdown value={sortField} onChange={setSortField} />

            {/* Mobile view toggle */}
            <div className="flex gap-1 md:hidden">
              <button
                onClick={() => setMobileView("map")}
                className={`p-2 rounded-lg border transition-colors ${
                  mobileView === "map"
                    ? "bg-neon-red/20 border-neon-red/40 text-neon-red"
                    : "border-border text-muted"
                }`}
              >
                <Map size={18} />
              </button>
              <button
                onClick={() => setMobileView("list")}
                className={`p-2 rounded-lg border transition-colors ${
                  mobileView === "list"
                    ? "bg-neon-red/20 border-neon-red/40 text-neon-red"
                    : "border-border text-muted"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main content: Map + List */}
        <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
          {/* Map - desktop always visible, mobile toggled */}
          <div
            className={`md:w-[55%] md:block ${
              mobileView === "map" ? "w-full" : "hidden"
            }`}
            style={{ minHeight: 400 }}
          >
            <MapContainer
              cities={displayCities}
              votes={votes}
              userName={userName}
              onToggleVote={toggleVote}
              onToggleCompare={toggleCompare}
              compareIds={compareIds}
              getVoteCount={getVoteCount}
              hasVoted={hasVoted}
            />
          </div>

          {/* List - desktop always visible, mobile toggled */}
          <div
            className={`md:w-[45%] md:block overflow-y-auto ${
              mobileView === "list" ? "w-full" : "hidden"
            }`}
          >
            <CityList
              cities={displayCities}
              userName={userName}
              onToggleVote={(cityId) => toggleVote(cityId, userName)}
              onToggleCompare={toggleCompare}
              compareIds={compareIds}
              getVoteCount={getVoteCount}
              hasVoted={(cityId) => hasVoted(cityId, userName)}
            />
          </div>
        </div>
      </div>

      {/* Compare drawer */}
      <CompareDrawer
        cities={scoredCities}
        compareIds={compareIds}
        onClear={clearCompare}
      />
    </div>
  );
}
