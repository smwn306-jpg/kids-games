import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { ArtworkScreen } from '../artwork';
import { useAppProgress } from '../_layout';
import { speakHebrew, stopSpeech } from '../voice';

const W = 285, H = 454;
const answers = ['ג׳ירפה','פיל','אריה','זברה'];

export default function Animals() {
  const { level } = useLocalSearchParams<{ level?: string }>();
  const levelNo = Math.max(1, Math.min(12, Number(level) || 1));
  const { stars, addStars, gameCompleted, voiceEnabled } = useAppProgress();

  // The supplied reference is the visual source of truth. The invisible hit areas
  // make the artwork interactive without replacing any of its artwork with CSS/emoji.
  const [answered, setAnswered] = useState(false);
  useEffect(()=>{ speakHebrew('איזו חיה זאת?', voiceEnabled); return () => stopSpeech(); },[levelNo, voiceEnabled]);
  const choose = (answer: string) => {
    if (answered) return;
    if (answer === 'פיל') {
      speakHebrew('נכון! זאת חיה פיל.', voiceEnabled);
      addStars(1);
      gameCompleted(`animals-${levelNo}`);
      setAnswered(true);
    } else {
      speakHebrew('לא. נסו שוב.', voiceEnabled);
    }
  };

  const targets = [
    { id: 'back', rect: { x: 5, y: 8, w: 45, h: 45 }, path: '/levels' },
    { id: 'answer-giraffe', rect: { x: 8, y: 330, w: 63, h: 58 }, action: () => choose('ג׳ירפה') },
    { id: 'answer-elephant', rect: { x: 73, y: 330, w: 63, h: 58 }, action: () => choose('פיל') },
    { id: 'answer-lion', rect: { x: 139, y: 330, w: 63, h: 58 }, action: () => choose('אריה') },
    { id: 'answer-zebra', rect: { x: 205, y: 330, w: 63, h: 58 }, action: () => choose('זברה') },
    { id: 'speak', rect: { x: 229, y: 164, w: 48, h: 50 }, action: () => speakHebrew('איזו חיה זאת? זאת חיה פיל.', voiceEnabled) },
    { id: 'continue', rect: { x: 25, y: 400, w: 235, h: 48 }, action: () => {
      if (!answered) return;
      router.replace(`/game/animals?level=${levelNo < 12 ? levelNo + 1 : 1}` as any);
    }},
  ];

  return (
    <ArtworkScreen
      source={require('../../assets/animals-reference.png')}
      sourceW={W}
      sourceH={H}
      starBox={{ x: 223, y: 31, w: 59, h: 30 }}
      targets={targets}
    />
  );
}
