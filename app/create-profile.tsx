import { Image, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { speakHebrew } from '../src/voice';
import { useAppProgress } from './_layout';
import { createReferenceLayout } from '../src/ui/layout';

const W = 289, H = 500;

export default function CreateProfile() {
  const { width, height } = useWindowDimensions();
  const layout = createReferenceLayout(W, H, width, height);
  const { voiceEnabled } = useAppProgress();
  const [name, setName] = useState('');
  const rect = (x: number, y: number, w: number, h: number) => layout.rectToScreen({ x, y, w, h });

  const goNext = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    router.push({ pathname: '/choose-avatar', params: { name: trimmed } });
  };

  return (
    <View style={[s.root, { width, height }]}>
      <View pointerEvents="none" style={[s.canvasDebug, { left: layout.offsetX, top: layout.offsetY, width: layout.canvasWidth, height: layout.canvasHeight }]}>
        <Image source={require('../assets/name-reference.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch" />
        <Text style={s.debugText}>{`SCREEN ${Math.round(width)}×${Math.round(height)}  CANVAS ${Math.round(layout.canvasWidth)}×${Math.round(layout.canvasHeight)}  SCALE ${layout.scale.toFixed(3)}  OFFSET ${Math.round(layout.offsetX)},${Math.round(layout.offsetY)}`}</Text>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="שמעו איך למלא את השם" style={[rect(112, 236, 66, 66), s.touchLayer]} onPress={() => speakHebrew('איך קוראים לך? כתבו את השם שלכם בתיבה.', voiceEnabled)} />
      <TextInput value={name} onChangeText={setName} placeholder="השם שלי" placeholderTextColor="#a6a6c7" style={[s.input, rect(25, 165, 239, 48), { fontSize: 22 * layout.scale }]} textAlign="center" maxLength={16} autoFocus returnKeyType="next" onSubmitEditing={goNext} />
      <Pressable accessibilityRole="button" accessibilityLabel="הבא" style={[rect(79, 426, 139, 50), s.touchLayer]} onPress={goNext}><Text style={s.hiddenText}>הבא</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="חזרה" style={[rect(5, 8, 48, 48), s.touchLayer]} onPress={() => router.back()}><Text style={s.hiddenText}>חזרה</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#dff5ff', overflow: 'hidden' },
  canvasDebug: { position: 'absolute', borderWidth: 3, borderColor: '#00ff00', overflow: 'hidden' },
  debugText: { position: 'absolute', left: 4, top: 4, color: '#fff', backgroundColor: 'rgba(0,0,0,0.75)', paddingHorizontal: 5, paddingVertical: 3, fontSize: 10, fontWeight: '700' },
  input: { position: 'absolute', backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent', borderRadius: 12, fontWeight: '900', color: '#5c3db3', paddingVertical: 0, paddingHorizontal: 8, zIndex: 10 },
  touchLayer: { position: 'absolute', zIndex: 20 },
  hiddenText: { opacity: 0 },
});
