import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { createReferenceLayout } from '../src/ui/layout';
const W=259,H=500;
const avatars=[['lion','אריה'],['rabbit','ארנב'],['elephant','פיל'],['panda','פנדה'],['monkey','קוף'],['giraffe','ג׳ירפה'],['fox','שועל'],['penguin','פינגווין'],['bear','דוב']];
export default function ChooseAvatar(){
  const {width,height}=useWindowDimensions();const layout=createReferenceLayout(W,H,width,height);const{name}=useLocalSearchParams<{name:string}>();const[selected,setSelected]=useState('lion');const positions=[[18,136],[94,136],[170,136],[18,220],[94,220],[170,220],[18,307],[94,307],[170,307]];const rect=(x:number,y:number,w:number,h:number)=>layout.rectToScreen({x,y,w,h});
  return <View style={s.root}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}><Image source={require('../assets/avatar-reference-clean.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/></View>
    {avatars.map(([key,label],i)=>{const[x,y]=positions[i];return <Pressable key={key} accessibilityLabel={label} onPress={()=>setSelected(key)} style={[rect(x-2,y-2,70,70),{borderRadius:16,borderWidth:selected===key?3:0,borderColor:'#71c33a'}]}>{selected===key&&<Image source={require('../assets/selected-check.png')} style={[rect(x+41,y-5,24,24),{position:'absolute'}]} resizeMode="contain"/>}</Pressable>})}
    <Pressable style={rect(47,392,164,54)} onPress={()=>router.push({pathname:'/choose-color',params:{name:String(name||''),avatar:selected}})}><Text style={{opacity:0}}>הבא</Text></Pressable>
  </View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'}});
