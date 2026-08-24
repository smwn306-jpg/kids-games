import { Image, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { speakHebrew } from '../src/voice';
import { useAppProgress } from './_layout';
import { createReferenceLayout } from '../src/ui/layout';
const W=289,H=500;
export default function CreateProfile(){
  const {width,height}=useWindowDimensions();
  const layout=createReferenceLayout(W,H,width,height);
  const{voiceEnabled}=useAppProgress();const[name,setName]=useState('');
  const rect=(x:number,y:number,w:number,h:number)=>layout.rectToScreen({x,y,w,h});
  return <View style={s.root}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}><Image source={require('../assets/name-reference.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/></View>
    <Pressable accessibilityRole="button" accessibilityLabel="שמעו איך למלא את השם" style={rect(112,236,66,66)} onPress={()=>speakHebrew('איך קוראים לך? כתבו את השם שלכם בתיבה.', voiceEnabled)} />
    <TextInput value={name} onChangeText={setName} placeholder="השם שלי" placeholderTextColor="#a6a6c7" style={[s.input,{...rect(25,165,239,48),fontSize:22*layout.scale}]} textAlign="center" maxLength={16} autoFocus />
    <Pressable style={rect(79,426,139,50)} onPress={()=>{if(name.trim())router.push({pathname:'/choose-avatar',params:{name:name.trim()}})}}><Text style={{opacity:0}}>הבא</Text></Pressable>
    <Pressable style={rect(5,8,48,48)} onPress={()=>router.back()}><Text style={{opacity:0}}>חזרה</Text></Pressable>
  </View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},input:{position:'absolute',backgroundColor:'rgba(255,255,255,0.96)',borderWidth:2,borderColor:'#b9cbe8',borderRadius:16,fontWeight:'900',color:'#5c3db3',paddingVertical:0}});
