import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const W = 259, H = 500;
const avatars = [['lion','אריה'],['rabbit','ארנב'],['elephant','פיל'],['panda','פנדה'],['monkey','קוף'],['giraffe','ג׳ירפה'],['fox','שועל'],['penguin','פינגווין'],['bear','דוב']];

export default function ChooseAvatar() {
  const { width, height } = useWindowDimensions();
  const canvasWidth = width;
  const canvasHeight = height * 0.70;
  const scale = canvasWidth / W;
  const scaleY = canvasHeight / H;
  const offsetY = (height - canvasHeight) / 2;
  const { name } = useLocalSearchParams<{ name: string }>();
  const [selected, setSelected] = useState('lion');
  const positions = [[18,136],[94,136],[170,136],[18,220],[94,220],[170,220],[18,307],[94,307],[170,307]];
  const rect = (x: number, y: number, w: number, h: number) => ({
    left: x * scale,
    top: offsetY + y * scaleY,
    width: w * scale,
    height: h * scaleY,
  });

  return (
    <View style={s.root}>
      <View pointerEvents="none" style={{ position: 'absolute', left: 0, top: offsetY, width: canvasWidth, height: canvasHeight, overflow: 'hidden' }}>
        <Image
          source={require('../assets/avatar-reference-clean.png')}
          style={{ position: 'absolute', left: 0, top: 0, width: canvasWidth, height: canvasHeight }}
          resizeMode="stretch"
        />
      </View>

      {avatars.map(([key, label], i) => {
        const [x, y] = positions[i];
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={() => setSelected(key)}
            style={[rect(x - 2, y - 2, 70, 70), { borderRadius: 16, borderWidth: selected === key ? 3 * scale : 0, borderColor: '#71c33a' }]}
          >
            {selected === key && (
              <Image
                source={require('../assets/selected-check.png')}
                style={{ position: 'absolute', right: -3 * scale, top: -3 * scale, width: 24 * scale, height: 24 * scale }}
                resizeMode="contain"
              />
            )}
          </Pressable>
        );
      })}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="הבא"
        style={[rect(47, 392, 164, 54), s.nextButton]}
        onPress={() => router.push({ pathname: '/choose-color', params: { name: String(name || ''), avatar: selected } })}
      >
        <Text style={s.hiddenText}>הבא</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#dff5ff', overflow: 'hidden' },
  nextButton: { zIndex: 20 },
  hiddenText: { opacity: 0 },
});
