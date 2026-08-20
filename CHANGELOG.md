# Changelog

## v7
- Recalibrated Home hit areas to the exact visible button bounds in the 347x557 source artwork.
- ImageBackground explicitly ignores pointer events so it cannot intercept taps.
- Hit targets use a near-invisible background and high z-index/elevation for reliable touch handling.
- All Home buttons use the existing Expo Router routes.
- Replaced the baked-in 125 badge area with a live star badge showing ⭐ 0 initially.
- Progress state remains 0 until gameplay awards stars.
