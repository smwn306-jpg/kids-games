import { Text, View } from 'react-native';
import { GameShell, Result, Choice, useRoundGame } from './GameShell';
import { useLocalSearchParams } from 'expo-router';

const data = [
  ['פיל', '🐘', ['פיל', 'אריה', 'ג׳ירפה', 'זברה']],
  ['אריה', '🦁', ['קוף', 'אריה', 'דוב', 'סוס']],
  ['ג׳ירפה', '🦒', ['ג׳ירפה', 'פיל', 'נמר', 'קוף']],
  ['זברה', '🦓', ['סוס', 'זברה', 'אריה', 'פיל']],
  ['קוף', '🐒', ['קוף', 'פנדה', 'ג׳ירפה', 'ארנב']],
] as const;

export default function Animals() {
  const { level } = useLocalSearchParams<{ level?: string }>();
  const levelNo = Math.max(1, Math.min(12, Number(level) || 1));
  const g = useRoundGame(data.length, i => data[i][0], i => [...data[i][2]], 'animals');

  return (
    <GameShell title={`חיות • שלב ${levelNo}`} emoji="🦁" score={g.stars} total={data.length}>
      {g.finished ? (
        <Result title="משחק החיות" score={g.stars} stars={g.stars === data.length ? 3 : g.stars >= 3 ? 2 : 1} againPath="/game/animals" />
      ) : (
        <>
          <View style={{ alignItems: 'center', backgroundColor: '#fffdf4', borderRadius: 28, padding: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: '900' }}>איזו חיה היא זו?</Text>
            <Text style={{ fontSize: 110, marginVertical: 8 }}>{data[g.round][1]}</Text>
            <Text style={{ color: '#7e7b71' }}>בחרו את התשובה הנכונה</Text>
          </View>
          <View style={{ marginTop: 16 }}>
            {g.options.map(o => (
              <Choice key={o} label={o} selected={g.selected === o} correct={o === data[g.round][0]} onPress={() => g.choose(o)} />
            ))}
          </View>
          {g.selected && (
            <Text onPress={g.next} style={{ textAlign: 'center', fontSize: 20, fontWeight: '900', color: '#5b9f2c', padding: 14 }}>
              {g.round === data.length - 1 ? 'סיום' : 'המשך ←'}
            </Text>
          )}
        </>
      )}
    </GameShell>
  );
}