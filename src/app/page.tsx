"use client";

import { useState, useMemo } from "react";
import { Map, List, SlidersHorizontal, Filter } from "lucide-react";
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
  const [weights, setWeights] = useState<WeightConfig>(DEFAULT_WEIGHTS);
  const [mobileView, setMobileView] = useState<"map" | "list">("list");
  const [showWeights, setShowWeights] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { cities } = useCities();
  const { userName, setUserName } = useUserIdentity();
  const { votes, toggleVote, getVoteCount, hasVoted } = useVotes();
  const { filters, setFilters, sortField, setSortField, filterAndSort } = useFilters();
  const { compareIds, toggleCompare, clearCompare } = useCompare();

  const scoredCities = useScoring(cities, weights);
  const displayCities = useMemo(
    () => filterAndSort(scoredCities, getVoteCount),
    [scoredCities, filterAndSort, getVoteCount]
  );

  const activeFilterCount =
    (filters.regions.length > 0 ? 1 : 0) +
    (filters.maxFlightPrice < 500 ? 1 : 0) +
    (filters.maxAccommodation < 200 ? 1 : 0) +
    (filters.minNightlife > 1 ? 1 : 0) +
    (filters.directFlightOnly ? 1 : 0);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header userName={userName} />
      <UserIdentity isOpen={!userName} onSetName={setUserName} />

      {/* Compact toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card/30">
        <button
          onClick={() => { setShowWeights(!showWeights); setShowFilters(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-all ${
            showWeights
              ? "bg-neon-red/15 border-neon-red/40 text-neon-red"
              : "border-border text-muted hover:text-foreground hover:border-border/80"
          }`}
        >
          <SlidersHorizontal size={14} />
          Weights
        </button>

        <button
          onClick={() => { setShowFilters(!showFilters); setShowWeights(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-all ${
            showFilters || activeFilterCount > 0
              ? "bg-neon-red/15 border-neon-red/40 text-neon-red"
              : "border-border text-muted hover:text-foreground hover:border-border/80"
          }`}
        >
          <Filter size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 bg-neon-red text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        <SortDropdown value={sortField} onChange={setSortField} />

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted">{displayCities.length} cities</span>

          {/* Mobile view toggle */}
          <div className="flex gap-1 md:hidden">
            <button
              onClick={() => setMobileView("map")}
              className={`p-1.5 rounded-lg border transition-colors ${
                mobileView === "map"
                  ? "bg-neon-red/20 border-neon-red/40 text-neon-red"
                  : "border-border text-muted"
              }`}
            >
              <Map size={16} />
            </button>
            <button
              onClick={() => setMobileView("list")}
              className={`p-1.5 rounded-lg border transition-colors ${
                mobileView === "list"
                  ? "bg-neon-red/20 border-neon-red/40 text-neon-red"
                  : "border-border text-muted"
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Expandable panels — slide down, don't push content */}
      {showWeights && (
        <div className="border-b border-border bg-card/50 px-4 py-3 max-h-[280px] overflow-y-auto">
          <WeightSliders weights={weights} onChange={setWeights} inline />
        </div>
      )}
      {showFilters && (
        <div className="border-b border-border bg-card/50 px-4 py-3">
          <FilterBar filters={filters} onFiltersChange={setFilters} />
        </div>
      )}

      {/* Main content: Map + List — fills remaining space */}
      <div className="flex-1 flex gap-0 min-h-0 overflow-hidden">
        {/* Map */}
        <div
          className={`md:w-[55%] md:block ${
            mobileView === "map" ? "w-full" : "hidden"
          }`}
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

        {/* List */}
        <div
          className={`md:w-[45%] md:block overflow-y-auto border-l border-border ${
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

      <CompareDrawer
        cities={scoredCities}
        compareIds={compareIds}
        onClear={clearCompare}
      />
    </div>
  );
}
