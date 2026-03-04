"use client";

import { Skull } from "lucide-react";
import { useState } from "react";

interface UserIdentityProps {
  onSetName: (name: string) => void;
  isOpen: boolean;
}

export function UserIdentity({ onSetName, isOpen }: UserIdentityProps) {
  const [value, setValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      onSetName(trimmed);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl">
        <div className="flex flex-col items-center gap-4 mb-6">
          <Skull size={40} className="text-red-500" />
          <h2
            className="text-xl font-bold text-center text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            What&apos;s your name, legend?
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your name..."
            maxLength={32}
            autoFocus
            className={[
              "w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground",
              "outline-none transition-all duration-150",
              "border-border focus:border-red-500 focus:ring-2 focus:ring-red-500/30",
            ].join(" ")}
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className={[
              "w-full rounded-lg px-4 py-3 font-semibold text-white transition-all duration-150",
              "bg-red-500 hover:bg-red-600 active:scale-95",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
            ].join(" ")}
          >
            Let&apos;s Go
          </button>
        </form>
      </div>
    </div>
  );
}
