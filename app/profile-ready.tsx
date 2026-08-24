import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppProgress } from './_layout';
import { speakHebrew } from '../src/voice';
import { useEffect } from 'react';
import { createReferenceLayout } from '../src/ui/layout';
const W=321,H=500;
export default function ProfileReady(){
  const {width,height}=useWindowDimensions();const layout=createReferenceLayout(W,H,width,height);const{name,avatar,color}=useLocalSearchParams<{name:string;avatar:string;color:string}>();const{createProfile,voiceEnabled}=useAppProgress();const avatarMap:Record<string,any>={lion:require('../assets/avatar-lion.png'),rabbit:require('../assets/avatar-rabbit.png'),elephant:require('../assets/avatar-elephant.png'),panda:require('../assets/avatar-panda.png'),monkey:require('../assets/avatar-monkey.png'),giraffe:require('../assets/avatar-giraffe.png'),fox:require('../assets/avatar-fox.png'),penguin:require('../assets/avatar-penguin.png'),bear:require('../assets/avatar-bear.png')};const avatarAsset=avatarMap[String(avatar||'lion')]||avatarMap.lion;const rect=(x:number,y:number,w:number,h:number)=>layout.rectToScreen({x,y,w,h});
  useEffect(()=>{ const clean=String(name||'').trim(); if(clean) speakHebrew(`שלום ${clean}! איזה כיף לראות אותך. בואו נתחיל לשחק!`, voiceEnabled); },[name,voiceEnabled]);
  return <View style={s.root}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}><Image source={require('../assets/profile-ready-reference-clean.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/></View>
    <View pointerEvents="none" style={[{borderRadius:10,backgroundColor:'#742fb7',zIndex:20},rect(101,300,119,40)]}><Text style={{color:'#fff',textAlign:'center',fontWeight:'900',fontSize:24*layout.scale,lineHeight:36*layout.scale}}>{String(name||'')}</Text></View>
    <View pointerEvents="none" style={[{borderRadius:54,overflow:'hidden'},rect(108,144,105,105)]}><Image source={avatarAsset} style={{width:'100%',height:'100%'}} resizeMode="cover"/></View>
    <Text pointerEvents="none" style={[s.name,rect(105,255,112,32),{fontSize:26*layout.scale}]}>{name}</Text>
    <Pressable style={rect(83,431,170,52)} onPress={async()=>{await createProfile(String(name||'ילד/ה'),String(avatar||'lion'),String(color||'green'));router.replace('/home')}}><Text style={{opacity:0}}>בואו נתחיל</Text></Pressable>
  </View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},name:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#6b3cae'}});
