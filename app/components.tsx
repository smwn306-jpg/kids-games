import { StyleSheet, Text, View } from 'react-native';

export function StarCountOverlay({ stars, scale = 1 }: { stars: number; scale?: number }) {
  // Exact number area inside the original star badge in the source artwork.
  // The original "125" is masked with the badge's white background and replaced by live state.
  return (
    <View
      pointerEvents="none"
      style={[
        styles.countMask,
        {
          left: 75 * scale,
          top: 25 * scale,
          width: 70 * scale,
          height: 36 * scale,
          borderRadius: 12 * scale,
        },
      ]}
    >
      <Text style={[styles.star, { fontSize: 18 * scale }]}>⭐</Text>
      <Text style={[styles.number, { fontSize: 15 * scale }]}>{stars}</Text>
    </View>
  );
}

export function StarBadge({ stars }: { stars: number }) {
  return (
    <View pointerEvents="none" style={styles.badge}>
      <Text style={styles.star}>⭐</Text>
      <Text style={styles.number}>{stars}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  countMask: {
    position: 'absolute',
    backgroundColor: '#fffaf0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
  },
  badge: {
    minWidth: 68,
    height: 34,
    paddingHorizontal: 6,
    borderRadius: 15,
    backgroundColor: '#fffaf0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: { fontSize: 18 },
  number: { fontWeight: '900', color: '#604d2c', textAlign: 'center', marginLeft: 2 },
});
