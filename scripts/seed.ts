/**
 * Seed script: pushes all cities from static data to Firestore.
 * Run with: npx tsx scripts/seed.ts
 * Uses the client SDK with open Firestore rules (no service account needed).
 */
import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";
import { cities } from "../src/data/cities";

config({ path: ".env.local" });

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

const db = getFirestore(app);

async function seed() {
  console.log(`Seeding ${cities.length} cities to Firestore...`);

  const batch = writeBatch(db);
  for (const city of cities) {
    const ref = doc(db, "cities", city.id);
    batch.set(ref, city);
  }

  await batch.commit();
  console.log(`Done! ${cities.length} cities written to Firestore.`);
}

seed().catch(console.error);
