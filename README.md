# DeathBySundayCrew — Destination Picker

Interactive app for a group of friends to explore, compare, filter, and vote on ~50 European cities for a 4-day boys trip in November from Frankfurt.

Share a single link — everyone votes in real-time.

## Features

- **50 European cities** with flight prices, accommodation, beer prices, nightlife/culture ratings, weather data
- **Weighted scoring** — drag sliders to prioritize what matters (nightlife vs budget vs weather)
- **Interactive dark map** — Leaflet with CartoDB dark_matter tiles, clustered markers, color-coded by score
- **Filters** — by region, max price, min nightlife, direct flights only
- **Real-time voting** — powered by Firestore, syncs across all users instantly
- **Compare mode** — side-by-side comparison of up to 3 cities
- **Responsive** — mobile tab toggle (map/list), desktop 55/45 split

## Stack

Next.js 16 · TypeScript · Tailwind CSS v4 · Leaflet (react-leaflet) · Firebase Firestore · Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Firebase Setup

1. Create a Firebase project with Firestore enabled
2. Copy `.env.local.example` to `.env.local` and fill in your credentials
3. Seed cities: `npx tsx scripts/seed.ts`

Without Firebase credentials, the app runs with static city data and local-only voting.

## Project Structure

```
src/
├── app/            # Next.js App Router pages & layout
├── components/     # UI components (map, list, scoring, voting, compare)
├── data/           # Static city data (fallback + seed source)
├── hooks/          # React hooks (scoring, votes, filters, identity, compare)
├── lib/            # Firebase config, scoring engine, constants
└── types/          # TypeScript interfaces
```
