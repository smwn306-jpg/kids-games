import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { StarCountOverlay } from './components';

// מידות הבסיס של איור הרקע המקורי
const BASE_W = 347;
const BASE_H = 557;

export default function Home() {
  const { width, height } = useWindowDimensions();
  const { stars } = useAppProgress();

  // חישוב יחסי המרה למסך הנוכחי
  const sx = width / BASE_W;
  const sy = height / BASE_H;

  // פונקציית עזר למיקום האזורים הנלחצים מעל האיור
  const getRect = (x: number, y: number, w: number, h: number) => ({
    position: 'absolute' as const,
    left: x * sx,
    top: y * sy,
    width: w * sx,
    height: h * sy,
  });

  return (
    <View style={styles.root}>
      {/* תמונת הרקע המאוירת */}
      <Image 
        source={require('../assets/home-screen-source.png')} 
        style={styles.backgroundImage} 
        resizeMode="stretch"
        pointerEvents="none"
      />
      
      {/* שכבת כמות הכוכבים */}
      <StarCountOverlay stars={stars} scale={sx} x={76} y={18} width={68} height={36} />

      {/* כפתור התחל לשחק מרכזי */}
      <Pressable style={getRect(68, 350, 204, 68)} onPress={() => router.push('/categories')} />
      
      {/* כפתורי הישגים, למידה ויצירה */}
      <Pressable style={getRect(276, 10, 65, 66)} onPress={() => router.push('/rewards')} />
      <Pressable style={getRect(57, 421, 76, 72)} onPress={() => router.push('/achievements')} />
      <Pressable style={getRect(135, 421, 76, 72)} onPress={() => router.push('/categories')} />
      <Pressable style={getRect(214, 421, 76, 72)} onPress={() => router.push('/game/draw')} />
      
      {/* סרגל ניווט תחתון */}
      <Pressable style={getRect(10, 495, 116, 60)} onPress={() => router.push('/settings')} />
      <Pressable style={getRect(126, 495, 95, 60)} onPress={() => router.replace('/')} />
      <Pressable style={getRect(218, 495, 127, 60)} onPress={() => router.push('/parent')} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#eaf8d6' 
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
