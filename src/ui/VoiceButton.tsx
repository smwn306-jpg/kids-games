import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppProgress } from '../../app/_layout';
import { speakHebrew } from '../voice';

export function VoiceButton({ text, compact=false }: { text: string; compact?: boolean }) {
  const { voiceEnabled } = useAppProgress();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`השמעת הוראה: ${text}`}
      onPress={() => speakHebrew(text, voiceEnabled)}
      style={[styles.button, compact && styles.compact]}
    >
      <Ionicons name="volume-high" size={compact ? 18 : 21} color="#477b92" />
      {!compact && <Text style={styles.label}>שמעו</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button:{alignSelf:'center',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:6,backgroundColor:'#fff',borderRadius:18,borderWidth:2,borderColor:'#cfe0e6',paddingHorizontal:13,paddingVertical:8,shadowColor:'#60727b',shadowOpacity:.12,shadowRadius:3,elevation:1},
  compact:{width:42,height:42,padding:0,borderRadius:14},
  label:{fontSize:15,fontWeight:'900',color:'#477b92'},
});
