"use client";

import { useState } from "react";

const MAX_COMPARE = 3;

export function useCompare() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const toggleCompare = (cityId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(cityId)) {
        return prev.filter((id) => id !== cityId);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, cityId];
    });
  };

  const clearCompare = () => setCompareIds([]);

  const isComparing = (cityId: string) => compareIds.includes(cityId);

  return { compareIds, toggleCompare, clearCompare, isComparing };
}
