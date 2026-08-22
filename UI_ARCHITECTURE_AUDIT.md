# UI Architecture Audit – V25

## Finding
Several screens are currently implemented as a full-screen PNG reference image plus invisible Pressable hitboxes. This means the screen can look correct visually, but the visible buttons/cards/text are not real React Native UI elements.

Affected screens include Home, Categories, Adventure, Levels, Animals, Memory, Draw, Achievements, Parent, Room, Profile/Profile selection and onboarding reference-based screens.

## Why this matters
- Visible UI is not accessible as real controls.
- Text in the reference image cannot update dynamically.
- Buttons cannot visually reflect pressed/disabled/locked states.
- Responsive behavior is limited to stretching the screenshot.
- Dynamic values such as stars/names can only be overlaid, which can create alignment problems.

## Code audit
- All route `.tsx` files now have a default export.
- Helper components were moved out of `app/` so Expo Router does not treat them as routes.
- Backup route file was moved out of `app/`.
- Local source imports were rechecked after the move.
- A full dependency build could not be executed in this environment because `npm install` timed out.

## Recommended next implementation step
Convert the reference-backed screens progressively into real React Native UI while keeping the supplied reference images as the visual source of truth. Use the reference images only as visual specifications and individual extracted assets where appropriate—not as the entire screen background.
