import { StyleSheet, Text, View } from 'react-native';

export function StarCountOverlay({ stars, scale = 1, x = 75, y = 25, width = 70, height = 36 }: { stars: number; scale?: number; x?: number; y?: number; width?: number; height?: number }) {
  return (
    <View pointerEvents="none" style={[styles.starOverlay, {
      left: x * scale,
      top: y * scale,
      width: width * scale,
      height: height * scale,
      borderRadius: 13 * scale,
    }]}> 
      <Text style={[styles.star, { fontSize: 18 * scale }]}>⭐</Text>
      <Text style={[styles.number, { fontSize: 15 * scale }]}>{stars}</Text>
    </View>
  );
}

export function StarBadge({ stars }: { stars: number }) {
  return <View pointerEvents="none" style={styles.badge}><Text style={styles.star}>⭐</Text><Text style={styles.number}>{stars}</Text></View>;
}

const styles = StyleSheet.create({
  starOverlay: {
    position: 'absolute',
    backgroundColor: '#fffaf0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  badge: {
    minWidth: 68, height: 34, paddingHorizontal: 6, borderRadius: 15,
    backgroundColor: '#fffaf0', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  star: { fontSize: 18 },
  number: { fontWeight: '900', color: '#604d2c', textAlign: 'center', marginLeft: 3 },
});
