# Changelog

## v17
- Added `star-only.png` cropped from the supplied reference star artwork; result screens no longer stretch the full star-count badge as a star.
- Kept the original reference badge for live counters and dynamic numbers.
- Improved Draw completion state and wired the reference's bottom action area to return to category selection after completion.
- Improved Memory completion flow while preserving the original reference artwork and card positions.
- Preserved the existing navigation, assets, and game architecture from v16.

## v18 polished
- Refined shared game shell for portrait/landscape and smaller screens.
- Added scroll-safe game content to avoid clipped controls.
- Reworked result card and score presentation.
- Added reusable NextButton and clearer answer feedback.
- Polished rewards, report and settings to match the supplied cartoon visual language.
- Added confirmation before resetting progress.
- Removed remaining UI emoji from app screens.


## V19 – Audio & Early Learning
- Added Hebrew text-to-speech with Expo Speech.
- Voice is enabled by default for children ages 4–7 and can be disabled in Settings.
- Learning games read prompts aloud: animals, numbers, letters, colors, math, puzzles, sorting, differences, mazes and rhythm.
- Animals screen uses its existing reference speaker button for replay and gives spoken feedback for correct/incorrect answers.
- Memory and drawing provide spoken onboarding and feedback.
- Added a reusable child-friendly VoiceButton and centralized Hebrew speech utility.
- Uses `he-IL`, slower rate and slightly higher pitch for clearer child-oriented prompts.
- V22: expanded the welcome opening into a full animated intro: entrance, mascot bob/tilt, pulsing CTA, sparkle accents, and Hebrew welcome voice. The approved welcome artwork remains the visual source.

## v23 – Refined animated opening
- Keeps the supplied animated welcome artwork fixed so the background no longer bobs with the mascot.
- Uses the built-in lion animation from the approved welcome GIF as the actual mascot motion.
- Adds a short, child-friendly artwork entrance, sparkle accents and a gentle CTA pulse.
- Delays Hebrew welcome speech slightly so the animation starts first.
- Stops speech and animation loops on unmount/navigation to avoid stale playback.
- Respects the global voice setting.
