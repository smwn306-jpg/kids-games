import { ImageBackground, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StarCountOverlay } from './components';
import { useAppProgress } from './_layout';

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const { stars } = useAppProgress();

  const SOURCE_W = 347;
  const SOURCE_H = 557;
  const artWidth = Math.min(width, 520);
  const artHeight = artWidth * SOURCE_H / SOURCE_W;
  const scale = artWidth / SOURCE_W;
  const top = Math.max(0, (height - artHeight) / 2);

  const hit = (x: number, y: number, w: number, h: number) => ({
    left: x * scale,
    top: y * scale,
    width: w * scale,
    height: h * scale,
  });

  const go = (path: string) => {
    router.push(path as any);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.stage}>
        <View style={[styles.art, { width: artWidth, height: artHeight, top }]}>
          <ImageBackground
            source={require('../assets/home-screen-source.png')}
            resizeMode="stretch"
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
          />

          {/* Covers the baked-in 125 and shows the live progress value. */}
          <StarCountOverlay stars={stars} scale={scale} />

          <Pressable accessibilityLabel="התחל לשחק" style={[styles.hit, hit(69, 351, 202, 67)]} onPress={() => go('/categories')} />
          <Pressable accessibilityLabel="מתנות" style={[styles.hit, hit(281, 12, 58, 58)]} onPress={() => go('/rewards')} />
          <Pressable accessibilityLabel="הישגים" style={[styles.hit, hit(58, 422, 73, 70)]} onPress={() => go('/achievements')} />
          <Pressable accessibilityLabel="לימוד" style={[styles.hit, hit(136, 422, 73, 70)]} onPress={() => go('/categories')} />
          <Pressable accessibilityLabel="יצירה" style={[styles.hit, hit(215, 422, 70, 70)]} onPress={() => go('/game/draw')} />
          <Pressable accessibilityLabel="הגדרות" style={[styles.hit, hit(12, 497, 112, 58)]} onPress={() => go('/settings')} />
          <Pressable accessibilityLabel="בית" style={[styles.hit, hit(130, 497, 88, 58)]} onPress={() => go('/')} />
          <Pressable accessibilityLabel="הורים" style={[styles.hit, hit(220, 497, 123, 58)]} onPress={() => go('/parent')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#EAF8D6' },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  art: { position: 'absolute', overflow: 'hidden', borderRadius: 24 },
  hit: { position: 'absolute', zIndex: 1000, elevation: 1000, backgroundColor: 'rgba(255,255,255,0.01)' },
});
