"use client";

import { useState, useEffect } from "react";
import type { City } from "@/types";
import { cities as staticCities } from "@/data/cities";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export function useCities() {
  const [cities, setCities] = useState<City[]>(staticCities);
  const [loading, setLoading] = useState(!!PROJECT_ID);

  useEffect(() => {
    if (!PROJECT_ID) return;

    let unsubscribe: (() => void) | undefined;

    async function subscribe() {
      const { db } = await import("@/lib/firebase");
      const { collection, onSnapshot } = await import("firebase/firestore");

      const citiesCol = collection(db, "cities");
      unsubscribe = onSnapshot(citiesCol, (snapshot) => {
        if (snapshot.empty) {
          // No cities in Firestore yet, keep static data
          setLoading(false);
          return;
        }
        const data: City[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as City[];
        setCities(data);
        setLoading(false);
      });
    }

    subscribe();

    return () => {
      unsubscribe?.();
    };
  }, []);

  return { cities, loading };
}
