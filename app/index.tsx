import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { StarCountOverlay } from './components';

const W = 347, H = 557;

export default function Home() {
  const { width, height } = useWindowDimensions();
  const { stars } = useAppProgress();
  const sx = width / W, sy = height / H;

  const r = (x: number, y: number, w: number, h: number) => ({
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
        resizeMode="stretch" 
        style={StyleSheet.absoluteFillObject} 
        pointerEvents="none"
      />
      
      {/* כמות כוכבים עליונה */}
      <StarCountOverlay stars={stars} scale={sx} x={76} y={18} width={68} height={36} />

      {/* כפתור התחל לשחק מרכזי */}
      <Pressable style={r(68, 350, 204, 68)} onPress={() => router.push('/categories')} />
      
      {/* כפתורי הישגים, למוד וליצירה */}
      <Pressable style={r(276, 10, 65, 66)} onPress={() => router.push('/rewards')} />
      <Pressable style={r(57, 421, 76, 72)} onPress={() => router.push('/achievements')} />
      <Pressable style={r(135, 421, 76, 72)} onPress={() => router.push('/categories')} />
      <Pressable style={r(214, 421, 76, 72)} onPress={() => router.push('/game/draw')} />
      
      {/* סרגל ניווט תחתון */}
      <Pressable style={r(10, 495, 116, 60)} onPress={() => router.push('/settings')} />
      <Pressable style={r(126, 495, 95, 60)} onPress={() => router.replace('/')} />
      <Pressable style={r(218, 495, 127, 60)} onPress={() => router.push('/parent')} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#eaf8d6' },
});