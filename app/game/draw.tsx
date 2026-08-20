import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DrawScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.page}>
        <Pressable onPress={() => router.back()}><Text style={s.back}>← חזרה</Text></Pressable>
        <Text style={s.icon}>🎨</Text>
        <Text style={s.title}>ציור וצביעה</Text>
        <View style={s.card}>
          <Text style={s.big}>בקרוב!</Text>
          <Text style={s.text}>מסך הצביעה מוכן לחיבור לגרפיקה המקורית ולמשחק הצביעה.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#fff7e4'},page:{padding:20,alignItems:'center'},back:{alignSelf:'flex-start',fontSize:18,fontWeight:'900',color:'#55717c'},icon:{fontSize:72,marginTop:45},title:{fontSize:32,fontWeight:'900',color:'#3d4c55',marginTop:10},card:{marginTop:30,width:'100%',backgroundColor:'#fff',borderRadius:25,padding:25,alignItems:'center'},big:{fontSize:25,fontWeight:'900'},text:{fontSize:16,color:'#66757b',textAlign:'center',marginTop:12,lineHeight:22}});
