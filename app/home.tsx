import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { StarCountOverlay } from '../src/ui/components';
import { useEffect } from 'react';

const W=360,H=570;
export default function Home(){
  const {width,height}=useWindowDimensions();
  const {stars,profilesReady,profiles,selectedProfileId}=useAppProgress();
  const activeProfile=profiles.find(p=>p.id===selectedProfileId);
  const scale=Math.max(width/W,height/H);
  const cw=W*scale,ch=H*scale,ox=(width-cw)/2,oy=(height-ch)/2;
  const r=(x:number,y:number,w:number,h:number)=>({position:'absolute' as const,left:ox+x*scale,top:oy+y*scale,width:w*scale,height:h*scale});
  useEffect(()=>{
    if(!profilesReady)return;
    if(!profiles.length) router.replace('/welcome');
    else if(!selectedProfileId) router.replace('/profiles');
  },[profilesReady,profiles.length,selectedProfileId]);
  if(!profilesReady || !profiles.length || !selectedProfileId) return <View style={styles.loading}/>;
  return <View style={styles.root}>
    <View pointerEvents="none" style={StyleSheet.absoluteFillObject}><Image source={require('../assets/home-reference-clean-ui.png')} resizeMode="cover" style={StyleSheet.absoluteFillObject}/></View>
    <Text pointerEvents="none" style={[styles.greeting,{left:18*scale+ox,top:82*scale+oy,width:110*scale,fontSize:15*Math.min(scale,1.4)}]}>שלום {activeProfile?.name || ''}!</Text>
    <StarCountOverlay stars={stars} scaleX={scale} scaleY={scale} offsetX={ox} offsetY={oy} x={84} y={33} width={74} height={30}/>
    <Pressable accessibilityLabel="החלפת משתמש" style={r(13,10,62,62)} onPress={()=>router.push('/profile')}/>
    <Pressable style={r(68,350,204,68)} onPress={()=>router.push('/categories')}/>
    <Pressable style={r(276,10,65,66)} onPress={()=>router.push('/rewards')}/>
    <Pressable style={r(57,421,76,72)} onPress={()=>router.push('/achievements')}/>
    <Pressable style={r(135,421,76,72)} onPress={()=>router.push('/categories')}/>
    <Pressable style={r(214,421,76,72)} onPress={()=>router.push('/game/draw')}/>
    <Pressable style={r(10,495,116,60)} onPress={()=>router.push('/settings')}/>
    <Pressable style={r(126,495,95,60)} onPress={()=>router.replace('/home')}/>
    <Pressable style={r(218,495,127,60)} onPress={()=>router.push('/parent')}/>
  </View>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#dff6ff',overflow:'hidden'},loading:{flex:1,backgroundColor:'#dff6ff'},greeting:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#5b3a9e',zIndex:40}});
