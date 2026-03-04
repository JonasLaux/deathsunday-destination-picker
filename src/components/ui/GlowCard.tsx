"use client";

import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function GlowCard({ children, className = "", onClick, active }: GlowCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-card border border-border rounded-xl p-4 transition-all duration-300
        hover:shadow-[0_0_15px_rgba(255,45,45,0.4),0_0_30px_rgba(255,45,45,0.1)]
        hover:border-neon-red/40
        ${active ? "shadow-[0_0_15px_rgba(255,45,45,0.4)] border-neon-red/40" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
