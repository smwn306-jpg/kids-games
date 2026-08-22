import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppProgress } from './_layout';
import { speakHebrew } from '../src/voice';
import { useEffect } from 'react';
const W=321,H=500;
export default function ProfileReady(){const {width,height}=useWindowDimensions();const sx=width/W,sy=height/H;const{name,avatar,color}=useLocalSearchParams<{name:string;avatar:string;color:string}>();const{createProfile,voiceEnabled}=useAppProgress();const avatarMap:Record<string,any>={lion:require('../assets/avatar-lion.png'),rabbit:require('../assets/avatar-rabbit.png'),elephant:require('../assets/avatar-elephant.png'),panda:require('../assets/avatar-panda.png'),monkey:require('../assets/avatar-monkey.png'),giraffe:require('../assets/avatar-giraffe.png'),fox:require('../assets/avatar-fox.png'),penguin:require('../assets/avatar-penguin.png'),bear:require('../assets/avatar-bear.png')};const avatarAsset=avatarMap[String(avatar||'lion')]||avatarMap.lion;
 useEffect(()=>{ const clean=String(name||'').trim(); if(clean) speakHebrew(`שלום ${clean}! איזה כיף לראות אותך. בואו נתחיל לשחק!`, voiceEnabled); },[name,voiceEnabled]);
 return <View style={s.root}>
<Image source={require('../assets/profile-ready-reference-clean.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/>
<View pointerEvents="none" style={{position:'absolute',left:108*sx,top:144*sy,width:105*sx,height:105*sy,borderRadius:54,overflow:'hidden'}}><Image source={avatarAsset} style={{width:'100%',height:'100%'}} resizeMode="cover"/></View>
<Text pointerEvents="none" style={[s.name,{left:105*sx,top:255*sy,width:112*sx,fontSize:26*Math.min(sx,sy)}]}>{name}</Text>
<Pressable style={{position:'absolute',left:83*sx,top:431*sy,width:170*sx,height:52*sy}} onPress={async()=>{await createProfile(String(name||'ילד/ה'),String(avatar||'lion'),String(color||'green'));router.replace('/home')}}><Text style={{opacity:0}}>בואו נתחיל</Text></Pressable>
</View>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},name:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#6b3cae'}});
