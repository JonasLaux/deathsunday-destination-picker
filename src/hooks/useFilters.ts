"use client";

import { useState } from "react";
import type { ScoredCity, FilterState, SortField } from "@/types";
import { DEFAULT_FILTERS } from "@/lib/constants";

function filterCities(cities: ScoredCity[], filters: FilterState): ScoredCity[] {
  return cities.filter((city) => {
    if (filters.regions.length > 0 && !filters.regions.includes(city.region)) return false;
    if (city.flightPriceEur > filters.maxFlightPrice) return false;
    if (city.accommodationPerNight > filters.maxAccommodation) return false;
    if (city.nightlifeRating < filters.minNightlife) return false;
    if (filters.directFlightOnly && !city.directFlight) return false;
    return true;
  });
}

function sortCities(
  cities: ScoredCity[],
  sortField: SortField,
  getVoteCount: (cityId: string) => number
): ScoredCity[] {
  return [...cities].sort((a, b) => {
    if (sortField === "mostVoted") {
      return getVoteCount(b.id) - getVoteCount(a.id);
    }
    if (sortField === "flightPriceEur" || sortField === "accommodationPerNight" || sortField === "beerPriceEur") {
      return a[sortField] - b[sortField];
    }
    return b[sortField] - a[sortField];
  });
}

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<SortField>("overallScore");

  function filterAndSort(
    cities: ScoredCity[],
    getVoteCount: (cityId: string) => number
  ): ScoredCity[] {
    const filtered = filterCities(cities, filters);
    return sortCities(filtered, sortField, getVoteCount);
  }

  return { filters, setFilters, sortField, setSortField, filterAndSort };
}
