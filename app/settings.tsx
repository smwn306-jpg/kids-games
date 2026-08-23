import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
const STAR_BADGE=require('../assets/star-badge-base.png');
export default function Settings(){const{resetProgress,stars,gamesPlayed,voiceEnabled,setVoiceEnabled}=useAppProgress();return <View style={s.root}>
 <View style={s.sky}/><Pressable onPress={()=>router.back()} style={s.back}><Text style={s.backText}>‹</Text></Pressable>
 <View style={s.titlePlate}><Text style={s.title}>הגדרות</Text></View>
 <View style={s.card}>
  <Row title="הקראה בקול" value={voiceEnabled?'פעיל':'כבוי'} onPress={()=>setVoiceEnabled(!voiceEnabled)} />
  <View style={s.row}><Text style={s.rowTitle}>כוכבים</Text><View style={s.starRow}><Image source={STAR_BADGE} resizeMode="stretch" style={s.starBadge}/><Text style={s.starNumber}>{stars}</Text></View></View>
  <Row title="משחקים" value={String(gamesPlayed)} />
 </View>
 <Pressable style={s.reset} onPress={()=>Alert.alert('איפוס התקדמות','האם לאפס את כל הכוכבים וההישגים?', [{text:'ביטול',style:'cancel'},{text:'איפוס',style:'destructive',onPress:resetProgress}])}><Text style={s.resetText}>איפוס התקדמות</Text></Pressable>
 <Text style={s.version}>Kids Games • גרסת ניסיון</Text>
 </View>}
function Row({title,value,onPress}:{title:string;value:string;onPress?:()=>void}){return <Pressable disabled={!onPress} onPress={onPress} style={s.row}><Text style={s.rowTitle}>{title}</Text><Text style={s.rowValue}>{value}</Text></Pressable>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#e2f7ff',padding:18,alignItems:'center'},sky:{...StyleSheet.absoluteFillObject,backgroundColor:'#e2f7ff'},back:{position:'absolute',top:14,left:12,width:46,height:46,borderRadius:16,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',zIndex:10},backText:{fontSize:38,fontWeight:'900',color:'#477b92',marginTop:-4},titlePlate:{marginTop:10,backgroundColor:'#6ab82d',borderRadius:24,paddingHorizontal:40,paddingVertical:10,borderWidth:4,borderColor:'#fff'},title:{fontSize:30,fontWeight:'900',color:'#fff'},card:{width:'96%',maxWidth:500,marginTop:22,backgroundColor:'#fff',borderRadius:28,padding:10,borderWidth:2,borderColor:'#e7dcc6'},row:{padding:18,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#eee'},rowTitle:{fontSize:19,fontWeight:'900',color:'#40545c'},rowValue:{fontSize:17,fontWeight:'900',color:'#6cae2a'},starRow:{width:74,height:30,position:'relative'},starBadge:{position:'absolute',left:0,top:0,width:74,height:30},starNumber:{position:'absolute',left:39,top:4,width:31,textAlign:'center',fontWeight:'900',color:'#604d2c'},reset:{marginTop:22,backgroundColor:'#ed8d79',paddingHorizontal:30,paddingVertical:14,borderRadius:20,borderWidth:3,borderColor:'#fff'},resetText:{color:'#fff',fontSize:18,fontWeight:'900'},version:{position:'absolute',bottom:14,color:'#8a9aa0',fontWeight:'700'}});
