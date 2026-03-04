"use client";
import { useMemo } from "react";
import { scoreCities } from "@/lib/scoring";
import type { City, WeightConfig, ScoredCity } from "@/types";

export function useScoring(cities: City[], weights: WeightConfig): ScoredCity[] {
  return useMemo(() => scoreCities(cities, weights), [cities, weights]);
}
