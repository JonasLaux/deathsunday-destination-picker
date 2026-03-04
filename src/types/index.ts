export interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  region: Region;
  flightPriceEur: number;
  accommodationPerNight: number;
  beerPriceEur: number;
  nightlifeRating: 1 | 2 | 3 | 4 | 5;
  cultureRating: 1 | 2 | 3 | 4 | 5;
  novemberAvgTempC: number;
  novemberRainDays: number;
  directFlight: boolean;
  description: string;
}

export interface ScoredCity extends City {
  overallScore: number;
  flightScore: number;
  accommodationScore: number;
  beerScore: number;
  nightlifeScore: number;
  weatherScore: number;
  cultureScore: number;
}

export interface WeightConfig {
  flightPrice: number;
  accommodation: number;
  beerPrice: number;
  nightlife: number;
  weather: number;
  culture: number;
}

export interface VoteData {
  [cityId: string]: {
    [userName: string]: boolean;
  };
}

export interface FilterState {
  regions: Region[];
  maxFlightPrice: number;
  maxAccommodation: number;
  minNightlife: number;
  directFlightOnly: boolean;
}

export type SortField =
  | "overallScore"
  | "flightPriceEur"
  | "accommodationPerNight"
  | "beerPriceEur"
  | "nightlifeRating"
  | "novemberAvgTempC"
  | "mostVoted";

export type Region =
  | "Eastern Europe"
  | "Balkans"
  | "Baltic"
  | "Mediterranean"
  | "Wildcard";
