"use client";
import { Star, Plane, Beer, Thermometer, Plus } from "lucide-react";
import type { ScoredCity } from "@/types";

interface CityPopupProps {
  city: ScoredCity;
  userName: string;
  onToggleVote: (cityId: string, userName: string) => void;
  onToggleCompare: (cityId: string) => void;
  isComparing: boolean;
  getVoteCount: (cityId: string) => number;
  hasVoted: (cityId: string, userName: string) => boolean;
  getVoters: (cityId: string) => string[];
}

export function CityPopup({
  city,
  userName,
  onToggleVote,
  onToggleCompare,
  isComparing,
  getVoteCount,
  hasVoted,
  getVoters,
}: CityPopupProps) {
  const voted = hasVoted(city.id, userName);
  const voteCount = getVoteCount(city.id);
  const voters = getVoters(city.id);

  return (
    <div
      style={{
        background: "#0f0f0f",
        color: "#ededed",
        fontFamily: "inherit",
        minWidth: 200,
        padding: "10px 12px",
        borderRadius: 8,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>
          {city.name}
        </div>
        <div style={{ fontSize: 12, color: "#888" }}>{city.country}</div>
      </div>

      {/* Overall score */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "#FF2D2D",
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {city.overallScore.toFixed(1)}
        <span style={{ fontSize: 12, fontWeight: 400, color: "#666", marginLeft: 4 }}>
          / 10
        </span>
      </div>

      {/* Mini metrics row */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <MetricBadge
          icon={<Plane size={10} />}
          label={`€${city.flightPriceEur}`}
          color="#39FF14"
        />
        <MetricBadge
          icon={<Beer size={10} />}
          label={`€${city.beerPriceEur.toFixed(2)}`}
          color="#FF6B35"
        />
        <MetricBadge
          icon={<Star size={10} />}
          label={`${city.nightlifeRating}/5`}
          color="#FFD700"
        />
        <MetricBadge
          icon={<Thermometer size={10} />}
          label={`${city.novemberAvgTempC}°C`}
          color="#60a5fa"
        />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={() => onToggleVote(city.id, userName)}
          title={voters.length > 0 ? voters.join(", ") : undefined}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "5px 8px",
            borderRadius: 6,
            border: `1px solid ${voted ? "#FFD700" : "#333"}`,
            background: voted ? "#FFD70022" : "#1a1a1a",
            color: voted ? "#FFD700" : "#888",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          <Star size={11} fill={voted ? "#FFD700" : "none"} />
          {voteCount > 0 ? voteCount : "Vote"}
        </button>

        <button
          onClick={() => onToggleCompare(city.id)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            padding: "5px 10px",
            borderRadius: 6,
            border: `1px solid ${isComparing ? "#FF2D2D" : "#333"}`,
            background: isComparing ? "#FF2D2D22" : "#1a1a1a",
            color: isComparing ? "#FF2D2D" : "#888",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            transition: "all 0.2s",
          }}
        >
          <Plus size={11} />
          {isComparing ? "Added" : "Compare"}
        </button>
      </div>

      {/* Voter names */}
      {voters.length > 0 && (
        <div style={{ marginTop: 6, fontSize: 10, color: "#666" }}>
          {voters.map((v) => (
            <span key={v} style={{ textTransform: "capitalize" }}>
              {v}
              {voters.indexOf(v) < voters.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricBadge({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 3,
        background: "#1a1a1a",
        border: `1px solid ${color}44`,
        borderRadius: 4,
        padding: "2px 6px",
        fontSize: 11,
        color: color,
      }}
    >
      {icon}
      {label}
    </div>
  );
}
