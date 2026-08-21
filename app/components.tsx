import { Image, StyleSheet, Text, View } from 'react-native';

// The reference screens already contain the exact star badge artwork.
// We keep that artwork and replace only the number so the badge stays faithful
// to the supplied design instead of introducing an emoji/CSS replacement.
const STAR_BADGE = require('../assets/star-badge-base.png');

export function StarCountOverlay({
  stars, x = 75, y = 25, width = 70, height = 30, scaleX = 1, scaleY = 1,
}: { stars: number; x?: number; y?: number; width?: number; height?: number; scaleX?: number; scaleY?: number }) {
  const sx = scaleX || 1;
  const sy = scaleY || 1;
  const fs = Math.max(10, Math.min(16, 15 * Math.min(sx, sy)));
  return (
    <View pointerEvents="none" style={[styles.overlay, {
      left: x * sx, top: y * sy, width: width * sx, height: height * sy,
    }]}>
      <Image source={STAR_BADGE} resizeMode="stretch" style={StyleSheet.absoluteFillObject} />
      <Text style={[styles.number, {
        left: width * 0.52 * sx,
        width: width * 0.43 * sx,
        fontSize: fs,
        lineHeight: Math.max(12, height * sy * 0.62),
      }]}>{stars}</Text>
    </View>
  );
}

export function StarBadge({ stars }: { stars: number }) {
  return (
    <View pointerEvents="none" style={styles.badge}>
      <Image source={STAR_BADGE} resizeMode="stretch" style={StyleSheet.absoluteFillObject} />
      <Text style={styles.badgeNumber}>{stars}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', zIndex: 50 },
  number: {
    position: 'absolute',
    top: '18%',
    color: '#604d2c',
    fontWeight: '900',
    textAlign: 'center',
  },
  badge: { width: 74, height: 30, position: 'relative' },
  badgeNumber: {
    position: 'absolute',
    left: 39,
    top: 4,
    width: 31,
    color: '#604d2c',
    fontWeight: '900',
    fontSize: 15,
    textAlign: 'center',
  },
});
