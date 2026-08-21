# Kids Games World — v17

Expo Router + React Native + TypeScript.

## Run
```bash
npm install
npx expo start -c
```

## Design rule
The supplied reference images are the visual source of truth. Existing reference artwork and supplied assets should be reused before creating replacements.

## V17 polish
- Live star counters use the original reference badge artwork.
- Result screens use a star-only crop from the same supplied artwork.
- Draw and Memory completion flows are wired without replacing the reference artwork.


### Audio / Voice
V19 adds optional Hebrew text-to-speech for the learning experience. Speech is enabled by default, can be turned off in Settings, and uses the device's available Hebrew voice. On Expo SDK 54 the project uses `expo-speech` ~14.0.8.


### V21 profile launch behavior
On every fresh app launch, if profiles exist, the app opens the profile picker first. The previously selected profile is remembered and marked, but is never auto-entered. Up to 6 child profiles are supported.

### Welcome animation
The welcome screen uses `assets/welcome-animated.gif`, generated from the approved welcome artwork, with a subtle breathing/bobbing mascot animation and Hebrew welcome voice.
