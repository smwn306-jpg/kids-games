export type ReferenceRect = { x: number; y: number; w: number; h: number };

export type ReferenceLayout = {
  referenceWidth: number;
  referenceHeight: number;
  screenWidth: number;
  screenHeight: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  canvasWidth: number;
  canvasHeight: number;
  toScreen: (x: number, y: number) => { left: number; top: number };
  rectToScreen: (rect: ReferenceRect) => { left: number; top: number; width: number; height: number };
};

/**
 * Maps a fixed reference design to the device with one uniform scale.
 *
 * Reference screens are artwork specifications, not arbitrary full-screen
 * wallpapers. We therefore use `contain` semantics: the complete reference
 * remains visible and keeps its aspect ratio. Artwork, overlays and touch
 * targets all use the exact same scale and offsets, so they cannot drift apart.
 */
export function createReferenceLayout(
  referenceWidth: number,
  referenceHeight: number,
  screenWidth: number,
  screenHeight: number,
): ReferenceLayout {
  const scale = Math.min(screenWidth / referenceWidth, screenHeight / referenceHeight);
  const canvasWidth = referenceWidth * scale;
  const canvasHeight = referenceHeight * scale;

  // Keep reference-driven screens anchored to the top of the app viewport.
  // This matches the supplied portrait references and avoids moving controls
  // vertically when the device has extra height.
  const offsetX = (screenWidth - canvasWidth) / 2;
  const offsetY = 0;

  const toScreen = (x: number, y: number) => ({
    left: offsetX + x * scale,
    top: offsetY + y * scale,
  });

  const rectToScreen = ({ x, y, w, h }: ReferenceRect) => ({
    left: offsetX + x * scale,
    top: offsetY + y * scale,
    width: w * scale,
    height: h * scale,
  });

  return {
    referenceWidth,
    referenceHeight,
    screenWidth,
    screenHeight,
    scale,
    offsetX,
    offsetY,
    canvasWidth,
    canvasHeight,
    toScreen,
    rectToScreen,
  };
}
