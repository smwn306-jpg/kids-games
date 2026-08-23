import * as Speech from 'expo-speech';

export const HEBREW_LANGUAGE = 'he-IL';

export function speakHebrew(text: string, enabled = true) {
  if (!enabled || !text.trim()) return;
  Speech.stop();
  Speech.speak(text, {
    language: HEBREW_LANGUAGE,
    rate: 0.82,
    pitch: 1.08,
    volume: 1,
  });
}

export function stopSpeech() {
  Speech.stop();
}
