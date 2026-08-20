import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

const BASE_W = 347, BASE_H = 557;

export default function Home() {
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
        source={require('../assets/home-screen-source.png')} 
        style={styles.bg} 
        resizeMode="stretch"
      />

      {/* כפתור התחל לשחק */}
      <Pressable style={getRect(75, 345, 197, 60)} onPress={() => router.push('/categories')} />

      {/* כפתורי משנה */}
      <Pressable style={getRect(70, 415, 60, 60)} onPress={() => router.push('/game/achievements')} />
      <Pressable style={getRect(144, 415, 60, 60)} onPress={() => router.push('/categories')} />
      <Pressable style={getRect(218, 415, 60, 60)} onPress={() => router.push('/game/draw')} />

      {/* תפריט תחתון */}
      <Pressable style={getRect(25, 485, 90, 45)} onPress={() => router.push('/game/settings')} />
      <Pressable style={getRect(140, 485, 67, 45)} onPress={() => router.push('/')} />
      <Pressable style={getRect(232, 485, 90, 45)} onPress={() => router.push('/game/parents')} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#87CEEB' },
  bg: { width: '100%', height: '100%', position: 'absolute' },
});