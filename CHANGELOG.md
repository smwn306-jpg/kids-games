# V11

- Continued from V10; no rebuild from scratch.
- Kept the existing Home implementation and full-screen behavior.
- Upgraded category screen to use the original category reference artwork.
- Kept Adventure and Levels as full-screen source-of-truth artwork screens with functional hotspots.
- Added a Report screen.
- Added explicit game routing so `/game/[id]` redirects to the real game implementation.
- Fixed game result actions: restart and navigation back to categories/home now work consistently.
- Removed web-only `location.reload()` from the animal game flow.
- Kept the shared star/progress system starting at 0.
