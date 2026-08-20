import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppProgress } from '../_layout';
import { useMemo, useState } from 'react';

const rounds = [
  { animal: 'פיל', emoji: '🐘', options: ['פיל', 'אריה', 'ג׳ירפה', 'זברה'] },
  { animal: 'אריה', emoji: '🦁', options: ['קוף', 'אריה', 'דוב', 'סוס'] },
  { animal: 'ג׳ירפה', emoji: '🦒', options: ['ג׳ירפה', 'פיל', 'נמר', 'קוף'] },
  { animal: 'זברה', emoji: '🦓', options: ['סוס', 'זברה', 'אריה', 'פיל'] },
  { animal: 'קוף', emoji: '🐒', options: ['קוף', 'פנדה', 'ג׳ירפה', 'ארנב'] },
];

export default function AnimalsGame() {
  const { addStars, gameCompleted } = useAppProgress();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const current = useMemo(() => rounds[round], [round]);

  const choose = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    if (answer === current.animal) setScore((s) => s + 1);
  };

  const next = () => {
    if (round === rounds.length - 1) {
      const earnedStars = score >= 5 ? 3 : score >= 3 ? 2 : 1;
      addStars(earnedStars);
      gameCompleted();
      setFinished(true);
      return;
    }
    setRound((r) => r + 1);
    setSelected(null);
  };

  if (finished) {
    const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1;
    return (
      <SafeAreaView style={styles.safe}>
        <LinearGradient colors={['#36bbed', '#cceff7', '#e7f6c7']} style={styles.bg}>
          <View style={styles.finish}>
            <Text style={styles.finishEmoji}>🏆</Text>
            <Text style={styles.finishTitle}>כל הכבוד!</Text>
            <Text style={styles.finishScore}>קיבלת {score} מתוך {rounds.length}</Text>
            <Text style={styles.finishStars}>{'⭐'.repeat(stars)}</Text>
            <Pressable style={styles.mainButton} onPress={() => router.replace('/game/animals')}>
              <Text style={styles.mainButtonText}>שחק שוב</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => router.replace('/categories')}>
              <Text style={styles.secondaryButtonText}>בחר משחק אחר</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={['#36bbed', '#cceff7', '#e7f6c7']} style={styles.bg}>
        <View style={styles.page}>
          <View style={styles.top}>
            <Pressable onPress={() => router.back()} style={styles.back}><Text style={styles.backText}>←</Text></Pressable>
            <Text style={styles.title}>חיות</Text>
            <View style={styles.stars}><Text>⭐ {score}</Text></View>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((round + 1) / rounds.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{round + 1}/{rounds.length}</Text>

          <View style={styles.questionCard}>
            <Text style={styles.question}>איזו חיה היא זו?</Text>
            <Text style={styles.animal}>{current.emoji}</Text>
            <Text style={styles.hint}>בחרו את התשובה הנכונה</Text>
          </View>

          <View style={styles.options}>
            {current.options.map((option) => {
              const correct = selected && option === current.animal;
              const wrong = selected === option && option !== current.animal;
              return (
                <Pressable
                  key={option}
                  onPress={() => choose(option)}
                  style={[styles.option, correct && styles.correct, wrong && styles.wrong]}
                >
                  <Text style={styles.optionText}>{option}</Text>
                  {correct && <Text style={styles.mark}>✓</Text>}
                  {wrong && <Text style={styles.mark}>✗</Text>}
                </Pressable>
              );
            })}
          </View>

          {selected && (
            <Pressable style={styles.nextButton} onPress={next}>
              <Text style={styles.nextText}>{round === rounds.length - 1 ? 'סיום ⭐' : 'המשך ←'}</Text>
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 }, bg: { flex: 1 }, page: { flex: 1, padding: 16 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  back: { width: 48, height: 48, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 32, fontWeight: '900', color: '#367a9a' },
  title: { flex: 1, textAlign: 'center', fontSize: 30, fontWeight: '900', color: '#fff', textShadowColor: '#3a7c9a', textShadowOffset: { width: 1, height: 2 }, textShadowRadius: 2 },
  stars: { backgroundColor: '#fff5d6', paddingHorizontal: 12, paddingVertical: 9, borderRadius: 18 },
  progressTrack: { height: 15, borderRadius: 10, backgroundColor: '#8fc6d0', overflow: 'hidden', marginTop: 18 },
  progressFill: { height: '100%', borderRadius: 10, backgroundColor: '#79c72c' }, progressText: { textAlign: 'center', color: '#55727c', fontWeight: '900', marginTop: 4 },
  questionCard: { backgroundColor: '#fffdf5', borderRadius: 28, padding: 22, alignItems: 'center', marginTop: 18, borderWidth: 2, borderColor: '#e9d6aa', elevation: 3 },
  question: { fontSize: 25, fontWeight: '900', color: '#4e4a3e' }, animal: { fontSize: 120, marginVertical: 8 }, hint: { color: '#8b8070', fontWeight: '700' },
  options: { marginTop: 16, gap: 10 },
  option: { minHeight: 58, borderRadius: 20, backgroundColor: '#fff', borderWidth: 2, borderColor: '#e1d5bd', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, elevation: 2 },
  correct: { backgroundColor: '#dff5bb', borderColor: '#74bd2d' }, wrong: { backgroundColor: '#ffdede', borderColor: '#e87979' }, optionText: { fontSize: 20, fontWeight: '900', color: '#4e4a3e' }, mark: { position: 'absolute', right: 18, fontSize: 25, fontWeight: '900' },
  nextButton: { marginTop: 'auto', alignSelf: 'center', backgroundColor: '#72c82e', borderRadius: 25, paddingHorizontal: 34, paddingVertical: 14, borderWidth: 3, borderColor: '#fff' }, nextText: { color: '#fff', fontSize: 20, fontWeight: '900' },
  finish: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 25 }, finishEmoji: { fontSize: 90 }, finishTitle: { fontSize: 36, fontWeight: '900', color: '#3d4c55', marginTop: 12 }, finishScore: { fontSize: 22, fontWeight: '800', color: '#68767c', marginTop: 8 }, finishStars: { fontSize: 34, marginVertical: 18 },
  mainButton: { backgroundColor: '#72c82e', borderRadius: 25, paddingHorizontal: 45, paddingVertical: 15, borderWidth: 3, borderColor: '#fff' }, mainButtonText: { color: '#fff', fontSize: 20, fontWeight: '900' },
  secondaryButton: { padding: 14, marginTop: 8 }, secondaryButtonText: { color: '#54717b', fontSize: 16, fontWeight: '800' },
});
