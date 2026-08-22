import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { speakHebrew, stopSpeech } from '../src/voice';
import { useAppProgress } from './_layout';

const W = 321, H = 500;

/**
 * First-run opening. The supplied animated artwork is the source of truth:
 * the background and lion animation stay fixed in the reference frame while
 * only the surrounding UI is animated. This avoids the old effect of moving
 * the entire background whenever the lion bobbed.
 */
export default function Welcome(){
  const { width, height } = useWindowDimensions();
  const { voiceEnabled } = useAppProgress();
  const sx = width / W, sy = height / H;

  const artworkIn = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(0)).current;
  const sparkle = useRef(new Animated.Value(0)).current;
  const spoken = useRef(false);

  useEffect(() => {
    Animated.timing(artworkIn, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const buttonLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(900),
        Animated.timing(buttonPulse, { toValue: 1, duration: 420, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(buttonPulse, { toValue: 0, duration: 420, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.delay(700),
      ])
    );
    buttonLoop.start();

    const sparkleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(sparkle, { toValue: 0, duration: 700, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    sparkleLoop.start();

    const speechTimer = setTimeout(() => {
      if (!spoken.current) {
        spoken.current = true;
        speakHebrew('ברוכים הבאים לעולם המשחקים!', voiceEnabled);
      }
    }, 650);

    return () => {
      clearTimeout(speechTimer);
      buttonLoop.stop();
      sparkleLoop.stop();
      stopSpeech();
    };
  }, [voiceEnabled]);

  const artworkOpacity = artworkIn;
  const artworkScale = artworkIn.interpolate({ inputRange: [0, 1], outputRange: [0.985, 1] });
  const buttonScale = buttonPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.035] });
  const sparkleOpacity = sparkle.interpolate({ inputRange: [0, 1], outputRange: [0.28, 1] });
  const sparkleScale = sparkle.interpolate({ inputRange: [0, 1], outputRange: [0.78, 1.16] });

  return (
    <View style={s.root}>
      <Animated.Image
        source={require('../assets/welcome-animated.gif')}
        resizeMode="stretch"
        style={[StyleSheet.absoluteFillObject, { opacity: artworkOpacity, transform: [{ scale: artworkScale }] }]}
        accessible
        accessibilityLabel="מסך פתיחה עם אריה מונף בכף ידו"
      />

      <Animated.View
        pointerEvents="none"
        style={[s.sparkle, { left: 42 * sx, top: 160 * sy, opacity: sparkleOpacity, transform: [{ scale: sparkleScale }] }]}
      >
        <Text style={s.sparkleText}>✦</Text>
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        style={[s.sparkle, { left: 270 * sx, top: 145 * sy, opacity: sparkleOpacity, transform: [{ scale: sparkleScale }] }]}
      >
        <Text style={s.sparkleText}>✦</Text>
      </Animated.View>

      <Animated.View
        style={[s.buttonMotion, {
          left: 79 * sx,
          top: 425 * sy,
          width: 166 * sx,
          height: 52 * sy,
          transform: [{ scale: buttonScale }],
        }]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="הבא"
          style={StyleSheet.absoluteFillObject}
          onPress={() => {
            stopSpeech();
            router.push('/create-profile');
          }}
        >
          <Text style={s.hiddenText}>הבא</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#17266c', overflow: 'hidden' },
  buttonMotion: { position: 'absolute' },
  hiddenText: { opacity: 0 },
  sparkle: { position: 'absolute', width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  sparkleText: { color: '#fff', fontSize: 20, textShadowColor: '#fff', textShadowRadius: 8 },
});
