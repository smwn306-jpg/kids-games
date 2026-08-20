import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';

const BASE_W = 347, BASE_H = 557;

export default function Adventure() {
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
        source={require('../assets/adventure-reference.png')} 
        style={styles.bg} 
        resizeMode="stretch"
      />

      <Pressable style={getRect(10, 10, 50, 40)} onPress={() => router.back()} />

      <Pressable style={getRect(45, 140, 100, 50)} onPress={() => router.push('/levels')} />
      <Pressable style={getRect(205, 140, 100, 50)} onPress={() => router.push('/levels')} />
      <Pressable style={getRect(125, 250, 100, 50)} onPress={() => router.push('/levels')} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#70c5eb' },
  bg: { width: '100%', height: '100%', position: 'absolute' },
});