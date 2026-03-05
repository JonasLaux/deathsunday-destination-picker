"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "deathbysunday-username";

export function useUserIdentity() {
  const [userName, setUserNameState] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const normalized = stored.toLowerCase();
      if (normalized !== stored) {
        localStorage.setItem(STORAGE_KEY, normalized);
      }
      setUserNameState(normalized);
    }
  }, []);

  function setUserName(name: string) {
    const normalized = name.toLowerCase();
    localStorage.setItem(STORAGE_KEY, normalized);
    setUserNameState(normalized);
  }

  return { userName, setUserName };
}
