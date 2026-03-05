"use client";

import { useState, useEffect } from "react";
import type { VoteData } from "@/types";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export function useVotes() {
  const [votes, setVotes] = useState<VoteData>({});

  useEffect(() => {
    if (!PROJECT_ID) return;

    let unsubscribe: (() => void) | undefined;

    async function subscribe() {
      const { db } = await import("@/lib/firebase");
      const { collection, onSnapshot } = await import("firebase/firestore");

      const votesCol = collection(db, "votes");
      unsubscribe = onSnapshot(votesCol, (snapshot) => {
        const data: VoteData = {};
        snapshot.forEach((doc) => {
          data[doc.id] = doc.data() as Record<string, boolean>;
        });
        setVotes(data);
      });
    }

    subscribe();

    return () => {
      unsubscribe?.();
    };
  }, []);

  async function toggleVote(cityId: string, userName: string) {
    if (!PROJECT_ID) {
      setVotes((prev) => {
        const cityVotes = prev[cityId] ?? {};
        if (cityVotes[userName]) {
          const { [userName]: _, ...rest } = cityVotes;
          return { ...prev, [cityId]: rest };
        }
        return { ...prev, [cityId]: { ...cityVotes, [userName]: true } };
      });
      return;
    }

    const { db } = await import("@/lib/firebase");
    const { doc, updateDoc, setDoc, deleteField } = await import("firebase/firestore");

    const voteRef = doc(db, "votes", cityId);
    if (votes[cityId]?.[userName]) {
      await updateDoc(voteRef, { [userName]: deleteField() });
    } else {
      await setDoc(voteRef, { [userName]: true }, { merge: true });
    }
  }

  function getVoteCount(cityId: string): number {
    return Object.keys(votes[cityId] ?? {}).length;
  }

  function hasVoted(cityId: string, userName: string): boolean {
    return Boolean(votes[cityId]?.[userName]);
  }

  function getVoters(cityId: string): string[] {
    return Object.keys(votes[cityId] ?? {});
  }

  return { votes, toggleVote, getVoteCount, hasVoted, getVoters };
}
