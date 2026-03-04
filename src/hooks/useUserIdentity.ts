"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "deathbysunday-username";

export function useUserIdentity() {
  const [userName, setUserNameState] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUserNameState(stored);
    }
  }, []);

  function setUserName(name: string) {
    localStorage.setItem(STORAGE_KEY, name);
    setUserNameState(name);
  }

  return { userName, setUserName };
}
