# V25.4 Code Polish

- Fixed reference-canvas rendering so artwork and hitboxes use the same scaled canvas.
- Added atomic duplicate-completion protection to the central progress store.
- Added per-game level progress for Animals.
- Fixed Animals level unlock calculation to use the new level-progress store.
- Added visible selected-state checks to avatar and color selection.
- Prevented duplicate completion taps in Puzzles, Colors, Music and Draw.
- Removed the Home screenshot flash from the startup route.
- Corrected placeholder artwork used for fruit items in Sorting to avoid unrelated animal art.
- Kept the supplied references as the visual source of truth; no new screen concept was introduced.
