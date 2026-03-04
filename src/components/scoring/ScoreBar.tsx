"use client";

interface ScoreBarProps {
  score: number;
  label?: string;
  small?: boolean;
}

function getBarStyle(score: number): { className: string; style?: React.CSSProperties } {
  if (score > 80) {
    return {
      className: "bg-neon-red",
      style: { boxShadow: "0 0 8px 2px rgba(255, 30, 30, 0.5)" },
    };
  }
  if (score > 60) {
    return { className: "bg-hot-orange" };
  }
  if (score >= 40) {
    return { className: "bg-gold" };
  }
  return { className: "bg-muted" };
}

export function ScoreBar({ score, label, small = false }: ScoreBarProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const { className: barClass, style: barStyle } = getBarStyle(clamped);
  const height = small ? "h-[4px]" : "h-[6px]";

  return (
    <div className="flex items-center gap-2 w-full">
      {label && (
        <span className="text-muted shrink-0 text-xs w-20 truncate">{label}</span>
      )}
      <div className={`flex-1 bg-border rounded-full overflow-hidden ${height}`}>
        <div
          className={`${height} ${barClass} rounded-full transition-all duration-300`}
          style={{ width: `${clamped}%`, ...barStyle }}
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-foreground shrink-0 w-7 text-right">
        {Math.round(clamped)}
      </span>
    </div>
  );
}
