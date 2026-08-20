import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={require('../assets/images/home-bg.png')} 
        style={styles.background} 
        resizeMode="cover"
      >
        <View style={styles.header}>
          <View style={styles.badge}><Text style={styles.badgeText}>⭐ 4</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>🎁</Text></View>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.mainBtn} onPress={() => router.push('/categories')}>
            <Text style={styles.mainBtnText}>🎮 התחל לשחק</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity style={styles.subBtn}><Text style={styles.subBtnText}>🏆 הישגים</Text></TouchableOpacity>
            <TouchableOpacity style={styles.subBtn}><Text style={styles.subBtnText}>📖 ללמוד</Text></TouchableOpacity>
            <TouchableOpacity style={styles.subBtn}><Text style={styles.subBtnText}>🎨 יצירה</Text></TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#8cd26c' },
  background: { flex: 1, width: '100%', height: '100%', justifyContent: 'space-between', padding: 20 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 10 },
  badge: { backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { fontSize: 18, fontWeight: 'bold' },
  content: { alignItems: 'center', marginBottom: 40 },
  mainBtn: { backgroundColor: '#7ed321', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30, marginBottom: 20, width: '80%', alignItems: 'center' },
  mainBtnText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  row: { flexDirection: 'row-reverse', justifyContent: 'space-around', width: '100%' },
  subBtn: { backgroundColor: '#fff', padding: 12, borderRadius: 15, minWidth: 90, alignItems: 'center' },
  subBtnText: { fontSize: 16, fontWeight: 'bold' },
});