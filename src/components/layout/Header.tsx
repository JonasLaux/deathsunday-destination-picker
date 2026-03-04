"use client";

import { SkullIcon } from "@/components/ui/SkullIcon";

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <SkullIcon className="w-9 h-9" />
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight">
            <span className="text-neon-red">Death</span>
            <span className="text-foreground">BySunday</span>
            <span className="text-hot-orange">Crew</span>
          </h1>
          <p className="text-xs text-muted">November Boys Trip — 4 Days from Frankfurt</p>
        </div>
      </div>
      {userName && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neon-red/20 border border-neon-red/30 flex items-center justify-center text-sm font-bold text-neon-red">
            {userName[0].toUpperCase()}
          </div>
          <span className="text-sm text-muted hidden sm:block">{userName}</span>
        </div>
      )}
    </header>
  );
}
