"use client";

import { ChevronDown } from "lucide-react";
import type { SortField } from "@/types";
import { SORT_OPTIONS } from "@/lib/constants";

interface SortDropdownProps {
  value: SortField;
  onChange: (value: SortField) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortField)}
        className="appearance-none bg-card border border-border rounded-lg pl-3 pr-8 py-2 text-sm text-foreground
          focus:outline-none focus:border-neon-red/40 focus:ring-1 focus:ring-neon-red/20
          hover:border-border/80 transition-colors duration-200 cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-card text-foreground">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 w-4 h-4 text-muted" />
    </div>
  );
}
