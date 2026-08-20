# Kids Games World

A React Native / Expo starter that is being upgraded from the existing project rather than rebuilt from scratch.

## Current status
- Existing navigation and game structure preserved.
- Home Screen upgraded to use the supplied approved artwork as the visual source of truth.
- Emoji/placeholder Home artwork removed.
- Real transparent hit targets keep Home controls interactive.
- Existing category, adventure, achievement, settings, parent and animal-game routes are preserved.

## Run
```bash
npm install
npx expo start
```

For web:
```bash
npm run web
```

## Design source
The Home artwork was extracted from the supplied design collage and stored under `assets/home-screen-source.png`.

## Next steps
1. Integrate the approved Category screen artwork.
2. Integrate the Adventure Map artwork.
3. Integrate the Animals Level Select artwork.
4. Replace remaining emoji/placeholders screen by screen.
5. Keep gameplay logic and navigation intact while upgrading visuals.
