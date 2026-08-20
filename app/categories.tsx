import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

const BASE_W = 347, BASE_H = 557;

export default function Categories() {
  const { width, height } = useWindowDimensions();
  const sx = width / BASE_W, sy = height / BASE_H;

  const getRect = (x: number, y: number, w: number, h: number) => ({
    position: 'absolute' as const,
    left: x * sx,
    top: y * sy,
    width: w * sx,
    height: h * sy,
  });

  return (
    <View style={styles.root}>
      <Image 
        source={require('../assets/categories-reference.png')} 
        style={styles.bg} 
        resizeMode="stretch"
      />

      <Pressable style={getRect(10, 10, 50, 40)} onPress={() => router.back()} />

      <Pressable style={getRect(20, 75, 90, 85)} onPress={() => router.push('/levels')} />
      <Pressable style={getRect(125, 75, 90, 85)} onPress={() => router.push('/game/numbers')} />
      <Pressable style={getRect(230, 75, 90, 85)} onPress={() => router.push('/game/letters')} />

      <Pressable style={getRect(20, 170, 90, 85)} onPress={() => router.push('/game/colors')} />
      <Pressable style={getRect(125, 170, 90, 85)} onPress={() => router.push('/game/puzzles')} />
      <Pressable style={getRect(230, 170, 90, 85)} onPress={() => router.push('/game/memory')} />

      <Pressable style={getRect(20, 265, 90, 85)} onPress={() => router.push('/game/math')} />
      <Pressable style={getRect(125, 265, 90, 85)} onPress={() => router.push('/game/draw')} />
      <Pressable style={getRect(230, 265, 90, 85)} onPress={() => router.push('/game/differences')} />

      <Pressable style={getRect(20, 360, 90, 85)} onPress={() => router.push('/game/mazes')} />
      <Pressable style={getRect(125, 360, 90, 85)} onPress={() => router.push('/game/music')} />
      <Pressable style={getRect(230, 360, 90, 85)} onPress={() => router.push('/game/sorting')} />

      <Pressable style={getRect(20, 465, 300, 65)} onPress={() => router.push('/adventure')} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#eaf8d6' },
  bg: { width: '100%', height: '100%', position: 'absolute' },
});