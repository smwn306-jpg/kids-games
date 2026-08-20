import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function DynamicGame() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>משחק: {id}</Text>
      
      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>חזרה</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  btn: { 
    paddingVertical: 12, 
    paddingHorizontal: 24, 
    backgroundColor: '#007AFF', 
    borderRadius: 8 
  },
  btnText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});