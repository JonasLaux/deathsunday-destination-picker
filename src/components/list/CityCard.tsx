"use client";

import {
  Plane,
  Bed,
  Beer,
  Music,
  Thermometer,
  CheckCircle,
  Star,
  Plus,
  Check,
} from "lucide-react";
import type { ScoredCity } from "@/types";
import { GlowCard } from "@/components/ui/GlowCard";
import { Badge } from "@/components/ui/Badge";

interface CityCardProps {
  city: ScoredCity;
  userName: string;
  onToggleVote: (cityId: string) => void;
  onToggleCompare: (cityId: string) => void;
  isComparing: boolean;
  getVoteCount: (cityId: string) => number;
  hasVoted: (cityId: string) => boolean;
}

function scoreColor(score: number): string {
  if (score > 80) return "text-neon-red";
  if (score > 60) return "text-hot-orange";
  if (score > 40) return "text-gold";
  return "text-muted";
}

function NightlifeStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-gold" : "text-muted"}>
          ★
        </span>
      ))}
    </span>
  );
}

export function CityCard({
  city,
  onToggleVote,
  onToggleCompare,
  isComparing,
  getVoteCount,
  hasVoted,
}: CityCardProps) {
  const voted = hasVoted(city.id);
  const voteCount = getVoteCount(city.id);

  return (
    <GlowCard>
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-heading text-lg font-bold leading-tight">{city.name}</h3>
            <p className="text-sm text-muted">{city.country}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge region={city.region} />
            <span className={`text-2xl font-bold tabular-nums ${scoreColor(city.overallScore)}`}>
              {Math.round(city.overallScore)}
            </span>
          </div>
        </div>

        {/* Metrics row */}
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Plane className="w-3.5 h-3.5" />
            €{city.flightPriceEur}
          </span>
          <span className="inline-flex items-center gap-1">
            <Bed className="w-3.5 h-3.5" />
            €{city.accommodationPerNight}/night
          </span>
          <span className="inline-flex items-center gap-1">
            <Beer className="w-3.5 h-3.5" />
            €{city.beerPriceEur.toFixed(2)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Music className="w-3.5 h-3.5" />
            <NightlifeStars rating={city.nightlifeRating} />
          </span>
          <span className="inline-flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5" />
            {city.novemberAvgTempC}°C
          </span>
          {city.directFlight && (
            <span className="inline-flex items-center gap-1 text-neon-green">
              <CheckCircle className="w-3.5 h-3.5" />
              Direct
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onToggleVote(city.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border
              ${voted
                ? "bg-neon-red/20 border-neon-red/40 text-neon-red"
                : "bg-card border-border text-muted hover:border-neon-red/30 hover:text-neon-red"
              }`}
          >
            <Star className={`w-4 h-4 ${voted ? "fill-neon-red" : ""}`} />
            <span>{voteCount}</span>
          </button>

          <button
            onClick={() => onToggleCompare(city.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border
              ${isComparing
                ? "bg-hot-orange/20 border-hot-orange/40 text-hot-orange"
                : "bg-card border-border text-muted hover:border-hot-orange/30 hover:text-hot-orange"
              }`}
          >
            {isComparing ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            Compare
          </button>
        </div>
      </div>
    </GlowCard>
  );
}
