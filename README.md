# Kids Games App — V12

This version continues the existing project. It is not a fresh rebuild.

## Run
npm install
npx expo start -c

## Main flow
Home → Categories → Adventure → Levels → Animals

All 12 categories have a real route and game implementation.

## Progress
The in-memory progress provider starts with 0 stars and 0 games played for a fresh app session. Completing a game awards stars and marks the category complete.

## Design source of truth
The original reference artwork is stored in `assets/` and is used directly on the main navigation screens.
