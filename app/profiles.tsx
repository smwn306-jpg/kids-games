import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { createReferenceLayout } from '../src/ui/layout';
const W=403,H=493;
const cardPos=[[26,120],[153,120],[279,120]];
const avatars:Record<string,any>={lion:require('../assets/avatar-lion.png'),rabbit:require('../assets/avatar-rabbit.png'),elephant:require('../assets/avatar-elephant.png'),panda:require('../assets/avatar-panda.png'),monkey:require('../assets/avatar-monkey.png'),giraffe:require('../assets/avatar-giraffe.png'),fox:require('../assets/avatar-fox.png'),penguin:require('../assets/avatar-penguin.png'),bear:require('../assets/avatar-bear.png')};
export default function Profiles(){
  const{width,height}=useWindowDimensions();const layout=createReferenceLayout(W,H,width,height);const{profiles,selectProfile,selectedProfileId}=useAppProgress();const rect=(x:number,y:number,w:number,h:number)=>layout.rectToScreen({x,y,w,h});
  return <View style={s.root}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}><Image source={require('../assets/profiles-reference-clean.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/></View>
    {profiles.map((p,i)=>{if(i>2)return null;const[x,y]=cardPos[i];return <Pressable key={p.id} style={[rect(x,y,113,184),{borderRadius:18}]} onPress={async()=>{await selectProfile(p.id);router.replace('/home')}}>
      <Image source={avatars[p.avatar]||avatars.lion} style={[s.avatar,{left:8*layout.scale,top:10*layout.scale,width:82*layout.scale,height:82*layout.scale}]} resizeMode="cover"/>{selectedProfileId===p.id&&<Image source={require('../assets/selected-check.png')} style={{position:'absolute',right:6*layout.scale,top:6*layout.scale,width:26*layout.scale,height:26*layout.scale}} resizeMode="contain"/>}<Text style={[s.name,{left:7*layout.scale,top:98*layout.scale,width:90*layout.scale,fontSize:17*layout.scale}]}>{p.name}</Text><View pointerEvents="none" style={{position:'absolute',left:18*layout.scale,top:128*layout.scale,width:76*layout.scale,height:28*layout.scale}}><Image source={require('../assets/star-badge-base.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/><Text style={[s.stars,{left:39*layout.scale,top:3*layout.scale,width:31*layout.scale,fontSize:14*layout.scale}]}>{p.stars}</Text></View>
    </Pressable>})}
    <Pressable style={rect(106,330,190,95)} onPress={()=>router.push(profiles.length>=3?'/profiles-more':'/create-profile')}><Text style={{opacity:0}}>ילד חדש</Text></Pressable>
    <Pressable style={rect(350,16,40,40)} onPress={()=>router.back()}><Text style={{opacity:0}}>הגדרות</Text></Pressable>
  </View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},avatar:{position:'absolute'},name:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#5141a5'},stars:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#7b633b'}});
