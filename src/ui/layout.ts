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
 * Maps a fixed-size reference design to the device using one uniform scale.
 * `cover` semantics are intentional: the reference keeps its aspect ratio and
 * fills the viewport; any crop is shared by artwork, overlays and touch targets.
 */
export function createReferenceLayout(
  referenceWidth: number,
  referenceHeight: number,
  screenWidth: number,
  screenHeight: number,
): ReferenceLayout {
  const scale = Math.max(screenWidth / referenceWidth, screenHeight / referenceHeight);
  const canvasWidth = referenceWidth * scale;
  const canvasHeight = referenceHeight * scale;
  const offsetX = (screenWidth - canvasWidth) / 2;
  const offsetY = (screenHeight - canvasHeight) / 2;

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
