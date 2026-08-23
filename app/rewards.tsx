import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
const STAR_BADGE=require('../assets/star-badge-base.png');
const TROPHY=require('../assets/trophy.png');
const rewards=[['כוכב ראשון',1],['אלוף המשחקים',10],['אוסף הכוכבים',20]] as const;
export default function Rewards(){
 const {stars}=useAppProgress();
 return <View style={s.root}>
   <View style={s.sky}/><View style={s.cloudOne}/><View style={s.cloudTwo}/>
   <Pressable onPress={()=>router.back()} style={s.back}><Text style={s.backText}>‹</Text></Pressable>
   <View style={s.titlePlate}><Text style={s.title}>המתנות שלי</Text></View>
   <View style={s.topBadge}><Image source={STAR_BADGE} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/><Text style={s.starNumber}>{stars}</Text></View>
   <View style={s.trophyWrap}><Image source={TROPHY} style={s.trophy} resizeMode="contain"/><Text style={s.trophyTitle}>הפרסים שלי</Text></View>
   <View style={s.list}>{rewards.map(([title,need])=>{const pct=Math.min(100,stars/need*100);return <View key={title} style={s.card}><View style={s.iconCircle}><Image source={STAR_BADGE} style={s.iconBadge} resizeMode="stretch"/></View><View style={s.info}><Text style={s.cardTitle}>{title}</Text><Text style={s.cardSub}>{need} כוכבים</Text><View style={s.track}><View style={[s.fill,{width:`${pct}%`}]} /></View></View><View style={[s.state,{backgroundColor:stars>=need?'#79c735':'#e7edf0'}]}><Text style={[s.stateText,{color:stars>=need?'#fff':'#7d8a8f'}]}>{stars>=need?'✓':'נעול'}</Text></View></View>})}</View>
 </View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff',alignItems:'center',paddingTop:10},sky:{...StyleSheet.absoluteFillObject,backgroundColor:'#dff5ff'},cloudOne:{position:'absolute',top:80,left:-30,width:170,height:55,borderRadius:40,backgroundColor:'rgba(255,255,255,.7)'},cloudTwo:{position:'absolute',top:145,right:-40,width:190,height:60,borderRadius:40,backgroundColor:'rgba(255,255,255,.6)'},back:{position:'absolute',top:14,left:12,width:46,height:46,borderRadius:16,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',zIndex:10},backText:{fontSize:38,fontWeight:'900',color:'#477b92',marginTop:-4},titlePlate:{marginTop:12,backgroundColor:'#69b82a',borderRadius:24,paddingHorizontal:32,paddingVertical:10,borderWidth:4,borderColor:'#fff'},title:{fontSize:28,fontWeight:'900',color:'#fff'},topBadge:{position:'absolute',top:20,right:16,width:74,height:30},starNumber:{position:'absolute',left:39,top:4,width:31,textAlign:'center',fontSize:15,fontWeight:'900',color:'#604d2c'},trophyWrap:{marginTop:18,alignItems:'center'},trophy:{width:105,height:88},trophyTitle:{fontSize:22,fontWeight:'900',color:'#4d5c62',marginTop:-2},list:{width:'92%',maxWidth:500,marginTop:12},card:{backgroundColor:'rgba(255,255,255,.94)',borderRadius:24,padding:12,marginBottom:10,flexDirection:'row',alignItems:'center',borderWidth:2,borderColor:'#e7dcc6'},iconCircle:{width:52,height:52,borderRadius:18,backgroundColor:'#fff4c9',alignItems:'center',justifyContent:'center'},iconBadge:{width:48,height:20},info:{flex:1,marginHorizontal:12},cardTitle:{fontSize:18,fontWeight:'900',color:'#42535a'},cardSub:{fontSize:13,color:'#819097',marginTop:2},track:{height:8,backgroundColor:'#e3eaed',borderRadius:6,marginTop:7,overflow:'hidden'},fill:{height:'100%',backgroundColor:'#7ac632'},state:{width:38,height:38,borderRadius:14,alignItems:'center',justifyContent:'center'},stateText:{fontSize:20,fontWeight:'900'}});
