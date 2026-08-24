import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { StarCountOverlay } from '../src/ui/components';
import { createReferenceLayout } from '../src/ui/layout';
import { useEffect } from 'react';

const W=360,H=570;
export default function Home(){
  const {width,height}=useWindowDimensions();
  const {stars,profilesReady,profiles,selectedProfileId}=useAppProgress();
  const activeProfile=profiles.find(p=>p.id===selectedProfileId);
  const layout=createReferenceLayout(W,H,width,height);
  const r=(x:number,y:number,w:number,h:number)=>layout.rectToScreen({x,y,w,h});
  useEffect(()=>{
    if(!profilesReady)return;
    if(!profiles.length) router.replace('/welcome');
    else if(!selectedProfileId) router.replace('/profiles');
  },[profilesReady,profiles.length,selectedProfileId]);
  if(!profilesReady || !profiles.length || !selectedProfileId) return <View style={styles.loading}/>;
  return <View style={styles.root}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}>
      <Image source={require('../assets/home-reference-clean-ui.png')} resizeMode="contain" style={StyleSheet.absoluteFillObject}/>
    </View>
    <Text pointerEvents="none" style={[styles.greeting,{...r(18,82,110,28),fontSize:15*Math.min(layout.scale,1.4)}]}>שלום {activeProfile?.name || ''}!</Text>
    <StarCountOverlay stars={stars} scaleX={layout.scale} scaleY={layout.scale} offsetX={layout.offsetX} offsetY={layout.offsetY} x={84} y={33} width={74} height={30}/>
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
