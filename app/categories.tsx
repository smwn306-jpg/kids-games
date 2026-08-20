import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: 'animals', title: 'חיות', icon: '🦁', color: '#7ed321', path: '/game/animals' },
  { id: 'numbers', title: 'מספרים', icon: '1️⃣', color: '#ff6b6b', path: '/game/animals' },
  { id: 'letters', title: 'אותיות', icon: 'א', color: '#4da6ff', path: '/game/animals' },
  { id: 'colors', title: 'צבעים וצורות', icon: '🔺', color: '#ffb703', path: '/game/animals' },
  { id: 'puzzles', title: 'פאזלים', icon: '🧩', color: '#b5179e', path: '/game/animals' },
  { id: 'memory', title: 'זיכרון', icon: '🃏', color: '#2a9d8f', path: '/game/animals' },
];

export default function Categories() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>➔</Text>
          </TouchableOpacity>
          <Text style={styles.title}>בחר קטגוריה</Text>
        </View>

        <ScrollView contentContainerStyle={styles.grid}>
          {categories.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.card, { backgroundColor: item.color }]} 
              onPress={() => router.push(item.path as any)}
            >
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#eef9ff' },
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backBtn: { backgroundColor: '#fff', borderRadius: 20, padding: 10 },
  backText: { fontSize: 20, fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#2c3e50' },
  grid: { flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', height: 120, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  cardIcon: { fontSize: 40 },
  cardTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginTop: 8 },
});