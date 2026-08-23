import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
const W=263,H=500;
const colors=[['red','#ef4a3c'],['blue','#45a9ef'],['green','#6bcf43'],['yellow','#f5c83b'],['purple','#8757d6'],['orange','#f28b26']];
export default function ChooseColor(){const {width,height}=useWindowDimensions();const sx=width/W,sy=height/H;const{name,avatar}=useLocalSearchParams<{name:string;avatar:string}>();const [selected,setSelected]=useState('green');const pos=[[28,171],[99,171],[170,171],[28,256],[99,256],[170,256]];return <View style={s.root}>
<Image source={require('../assets/color-reference.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/>
{colors.map(([key],i)=>{const[x,y]=pos[i];return <Pressable key={key} style={{position:'absolute',left:(x-4)*sx,top:(y-4)*sy,width:67*sx,height:67*sy,borderRadius:20,borderWidth:selected===key?3:0,borderColor:'#70c13a'}} onPress={()=>setSelected(key)}>{selected===key&&<Image source={require('../assets/selected-check.png')} style={{position:'absolute',right:-3*sx,top:-3*sy,width:24*sx,height:24*sy}} resizeMode="contain"/>}</Pressable>})}
<Pressable style={{position:'absolute',left:78*sx,top:389*sy,width:151*sx,height:56*sy}} onPress={()=>router.push({pathname:'/profile-ready',params:{name:String(name||''),avatar:String(avatar||'lion'),color:selected}})}></Pressable>
</View>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'}});
