import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { createReferenceLayout } from '../src/ui/layout';
const W=263,H=500;
const colors=[['red','#ef4a3c'],['blue','#45a9ef'],['green','#6bcf43'],['yellow','#f5c83b'],['purple','#8757d6'],['orange','#f28b26']];
export default function ChooseColor(){
  const {width,height}=useWindowDimensions();const layout=createReferenceLayout(W,H,width,height);const{name,avatar}=useLocalSearchParams<{name:string;avatar:string}>();const [selected,setSelected]=useState('green');const pos=[[28,171],[99,171],[170,171],[28,256],[99,256],[170,256]];const rect=(x:number,y:number,w:number,h:number)=>layout.rectToScreen({x,y,w,h});
  return <View style={s.root}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}><Image source={require('../assets/color-reference.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/></View>
    {colors.map(([key],i)=>{const[x,y]=pos[i];return <Pressable key={key} style={[rect(x-4,y-4,67,67),{borderRadius:20,borderWidth:selected===key?3:0,borderColor:'#70c13a'}]} onPress={()=>setSelected(key)}>{selected===key&&<Image source={require('../assets/selected-check.png')} style={{position:'absolute',right:-3*layout.scale,top:-3*layout.scale,width:24*layout.scale,height:24*layout.scale}} resizeMode="contain"/>}</Pressable>})}
    <Pressable style={rect(78,389,151,56)} onPress={()=>router.push({pathname:'/profile-ready',params:{name:String(name||''),avatar:String(avatar||'lion'),color:selected}})} />
  </View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'}});
