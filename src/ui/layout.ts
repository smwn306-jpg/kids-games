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
 * Maps a fixed reference design to the device using one uniform cover scale.
 *
 * The reference is treated as the source canvas. The same scale and offsets
 * are used for the artwork, overlays and touch targets. This is important:
 * React Native must not perform a second, independent resize of the artwork.
 * When the device aspect ratio differs from the reference, the canvas is
 * centered and the excess is cropped equally rather than leaving blank space.
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

  // `cover` semantics: fill the complete viewport while preserving aspect
  // ratio. Any crop is represented by the offsets and is therefore shared by
  // artwork, overlays and pressable targets.
  const scale = Math.max(
    safeScreenWidth / safeReferenceWidth,
    safeScreenHeight / safeReferenceHeight,
  );
  const canvasWidth = safeReferenceWidth * scale;
  const canvasHeight = safeReferenceHeight * scale;
  const offsetX = (safeScreenWidth - canvasWidth) / 2;
  const offsetY = (safeScreenHeight - canvasHeight) / 2;

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
