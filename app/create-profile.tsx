import { Image, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { speakHebrew } from '../src/voice';
import { useAppProgress } from './_layout';

const W = 289, H = 500;

export default function CreateProfile() {
  const { width, height } = useWindowDimensions();
  const canvasWidth = width;
  // Target the visual height requested for the phone: 70% of the available viewport.
  const canvasHeight = height * 0.70;
  const scaleX = canvasWidth / W;
  const scaleY = canvasHeight / H;
  const scale = scaleX;
  const offsetY = (height - canvasHeight) / 2;
  const rect = (x: number, y: number, w: number, h: number) => ({
    left: x * scaleX,
    top: offsetY + y * scaleY,
    width: w * scaleX,
    height: h * scaleY,
  });
  const { voiceEnabled } = useAppProgress();
  const [name, setName] = useState('');

  const goNext = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    router.push({ pathname: '/choose-avatar', params: { name: trimmed } });
  };

  return (
    <View style={[s.root, { width, height }]}>
      <View pointerEvents="none" style={[s.canvas, { left: 0, top: offsetY, width: canvasWidth, height: canvasHeight }]}>
        <Image
          source={require('../assets/name-reference.png')}
          style={{ width: canvasWidth, height: canvasHeight, position: 'absolute', left: 0, top: 0 }}
          resizeMode="stretch"
        />
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="שמעו איך למלא את השם" style={[rect(112, 236, 66, 66), s.touchLayer]} onPress={() => speakHebrew('איך קוראים לך? כתבו את השם שלכם בתיבה.', voiceEnabled)} />
      <TextInput value={name} onChangeText={setName} placeholder="השם שלי" placeholderTextColor="#a6a6c7" style={[s.input, rect(25, 165, 239, 48), { fontSize: 22 * scale }]} textAlign="center" maxLength={16} autoFocus returnKeyType="next" onSubmitEditing={goNext} />
      <Pressable accessibilityRole="button" accessibilityLabel="הבא" style={[rect(79, 426, 139, 50), s.touchLayer]} onPress={goNext}><Text style={s.hiddenText}>הבא</Text></Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="חזרה" style={[rect(5, 8, 48, 48), s.touchLayer]} onPress={() => router.back()}><Text style={s.hiddenText}>חזרה</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#dff5ff', overflow: 'hidden' },
  canvas: { position: 'absolute', overflow: 'hidden' },
  input: { position: 'absolute', backgroundColor: 'transparent', borderWidth: 0, borderColor: 'transparent', borderRadius: 12, fontWeight: '900', color: '#5c3db3', paddingVertical: 0, paddingHorizontal: 8, zIndex: 10 },
  touchLayer: { position: 'absolute', zIndex: 20 },
  hiddenText: { opacity: 0 },
});
