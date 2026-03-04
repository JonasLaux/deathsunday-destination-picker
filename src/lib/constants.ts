import type { WeightConfig, FilterState, Region } from "@/types";

export const DEFAULT_WEIGHTS: WeightConfig = {
  flightPrice: 70,
  accommodation: 60,
  beerPrice: 40,
  nightlife: 80,
  weather: 50,
  culture: 30,
};

export const REGIONS: Region[] = [
  "Eastern Europe",
  "Balkans",
  "Baltic",
  "Mediterranean",
  "Wildcard",
];

export const DEFAULT_FILTERS: FilterState = {
  regions: [],
  maxFlightPrice: 500,
  maxAccommodation: 200,
  minNightlife: 1,
  directFlightOnly: false,
};

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "overallScore", label: "Best Overall" },
  { value: "flightPriceEur", label: "Cheapest Flight" },
  { value: "accommodationPerNight", label: "Cheapest Stay" },
  { value: "beerPriceEur", label: "Cheapest Beer" },
  { value: "nightlifeRating", label: "Best Nightlife" },
  { value: "novemberAvgTempC", label: "Best Weather" },
  { value: "mostVoted", label: "Most Voted" },
];
