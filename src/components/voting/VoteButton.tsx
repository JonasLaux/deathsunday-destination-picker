"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface VoteButtonProps {
  voted: boolean;
  count: number;
  onClick: () => void;
  size?: "sm" | "md";
}

export function VoteButton({ voted, count, onClick, size = "md" }: VoteButtonProps) {
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);
    onClick();
  };

  const iconSize = size === "sm" ? 16 : 20;
  const textSize = size === "sm" ? "text-xs" : "text-sm";
  const padding = size === "sm" ? "px-2 py-1" : "px-3 py-1.5";

  return (
    <button
      onClick={handleClick}
      className={[
        "flex items-center gap-1.5 rounded-full border transition-all duration-150 select-none",
        padding,
        animating ? "scale-90" : "scale-100",
        voted
          ? "border-red-500 bg-red-500/10 text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
          : "border-border text-muted-foreground hover:border-red-500/50 hover:text-red-400",
      ].join(" ")}
      aria-label={voted ? "Remove vote" : "Vote"}
    >
      <Star
        size={iconSize}
        className="transition-all duration-150"
        fill={voted ? "currentColor" : "none"}
        strokeWidth={2}
      />
      <span className={`font-medium tabular-nums ${textSize}`}>{count}</span>
    </button>
  );
}
