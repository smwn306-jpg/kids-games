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
 * Maps the reference design to the device using a single uniform scale.
 * The reference is fit to the FULL device width, preserving its aspect ratio.
 * Vertical letterboxing is allowed; the artwork is never cropped horizontally
 * or vertically. The same scale/offset is used for touch targets.
 */
export function createReferenceLayout(
  referenceWidth: number,
  referenceHeight: number,
  screenWidth: number,
  screenHeight: number,
): ReferenceLayout {
  const safeReferenceWidth = Math.max(1, referenceWidth);
  const safeReferenceHeight = Math.max(1, referenceHeight);
  const safeScreenWidth = Math.max(1, screenWidth);
  const safeScreenHeight = Math.max(1, screenHeight);

  // Width is the source of truth: the reference fills the device width.
  // This preserves the 289:500 reference aspect ratio and prevents the
  // reference artwork from being rendered as a small inset canvas.
  const scale = safeScreenWidth / safeReferenceWidth;
  const canvasWidth = safeReferenceWidth * scale;
  const canvasHeight = safeReferenceHeight * scale;
  const offsetX = (safeScreenWidth - canvasWidth) / 2;
  const offsetY = Math.max(0, (safeScreenHeight - canvasHeight) / 2);

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
    referenceWidth: safeReferenceWidth,
    referenceHeight: safeReferenceHeight,
    screenWidth: safeScreenWidth,
    screenHeight: safeScreenHeight,
    scale,
    offsetX,
    offsetY,
    canvasWidth,
    canvasHeight,
    toScreen,
    rectToScreen,
  };
}
