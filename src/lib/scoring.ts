import type { City, WeightConfig, ScoredCity } from "@/types";

function normalize(values: number[], invert: boolean): number[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  return values.map((v) => {
    const normalized = range === 0 ? 0 : ((v - min) / range) * 100;
    return invert ? 100 - normalized : normalized;
  });
}

export function scoreCities(cities: City[], weights: WeightConfig): ScoredCity[] {
  if (cities.length === 0) return [];

  const flightScores = normalize(cities.map((c) => c.flightPriceEur), true);
  const accommodationScores = normalize(cities.map((c) => c.accommodationPerNight), true);
  const beerScores = normalize(cities.map((c) => c.beerPriceEur), true);
  const nightlifeScores = normalize(cities.map((c) => c.nightlifeRating), false);
  const weatherScores = normalize(cities.map((c) => c.novemberAvgTempC), false);
  const cultureScores = normalize(cities.map((c) => c.cultureRating), false);
  const rainScores = normalize(cities.map((c) => c.novemberRainDays), true);

  const totalWeight =
    weights.flightPrice +
    weights.accommodation +
    weights.beerPrice +
    weights.nightlife +
    weights.weather +
    weights.culture;

  return cities
    .map((city, i) => {
      const overallScore =
        totalWeight === 0
          ? 0
          : (weights.flightPrice * flightScores[i] +
              weights.accommodation * accommodationScores[i] +
              weights.beerPrice * beerScores[i] +
              weights.nightlife * nightlifeScores[i] +
              weights.weather * (weatherScores[i] * 0.5 + rainScores[i] * 0.5) +
              weights.culture * cultureScores[i]) /
            totalWeight;

      return {
        ...city,
        overallScore,
        flightScore: flightScores[i],
        accommodationScore: accommodationScores[i],
        beerScore: beerScores[i],
        nightlifeScore: nightlifeScores[i],
        weatherScore: weatherScores[i] * 0.5 + rainScores[i] * 0.5,
        cultureScore: cultureScores[i],
      };
    })
    .sort((a, b) => b.overallScore - a.overallScore);
}
