import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';

export default function Report() {
  const { stars, gamesPlayed, completed } = useAppProgress();
  const rows = [
    ['🦁', 'חיות', 'animals'],
    ['🔢', 'מספרים', 'numbers'],
    ['🔤', 'אותיות', 'letters'],
    ['🧠', 'זיכרון', 'memory'],
    ['🎨', 'ציור', 'draw'],
  ];

  return (
    <View style={s.page}>
      <Pressable onPress={() => router.back()}>
        <Text style={s.back}>← חזרה</Text>
      </Pressable>
      <Text style={s.title}>הדוח שלי 📊</Text>
      <View style={s.summary}>
        <Box v={stars} t="כוכבים" />
        <Box v={gamesPlayed} t="משחקים" />
        <Box v={completed.size} t="קטגוריות" />
      </View>
      <View style={s.card}>
        {rows.map(([e, t, id]) => (
          <View key={id} style={s.row}>
            <Text style={s.emoji}>{e}</Text>
            <Text style={s.label}>{t}</Text>
            <Text style={s.status}>{completed.has(id) ? '✓ הושלם' : '○ בתהליך'}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function Box({ v, t }: { v: number; t: string }) {
  return (
    <View style={s.box}>
      <Text style={s.value}>{v}</Text>
      <Text style={s.sub}>{t}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e2f7ff', padding: 20 },
  back: { fontSize: 20, fontWeight: '900', color: '#3d7893' },
  title: { fontSize: 34, fontWeight: '900', textAlign: 'center', color: '#36525e', marginTop: 10 },
  summary: { flexDirection: 'row', gap: 10, marginTop: 22 },
  box: { flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 16, alignItems: 'center' },
  value: { fontSize: 28, fontWeight: '900', color: '#65a72c' },
  sub: { color: '#7d8b90', marginTop: 4 },
  card: { marginTop: 16, backgroundColor: '#fff', borderRadius: 24, padding: 12 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#edf0ef' },
  emoji: { fontSize: 28, width: 48 },
  label: { flex: 1, fontSize: 18, fontWeight: '900', color: '#42545c' },
  status: { fontWeight: '800', color: '#6d8c98' },
});