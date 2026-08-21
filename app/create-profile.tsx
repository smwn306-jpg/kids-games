import { Image, Pressable, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
const W=289,H=500;
export default function CreateProfile(){const {width,height}=useWindowDimensions();const sx=width/W,sy=height/H;const[name,setName]=useState('');return <View style={s.root}>
<Image source={require('../assets/name-reference.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/>
<TextInput value={name} onChangeText={setName} placeholder="השם שלי" placeholderTextColor="#a6a6c7" style={[s.input,{left:25*sx,top:165*sy,width:239*sx,height:48*sy,fontSize:22*Math.min(sx,sy)}]} textAlign="center" maxLength={16} autoFocus />
<Pressable style={{position:'absolute',left:79*sx,top:426*sy,width:139*sx,height:50*sy}} onPress={()=>{if(name.trim())router.push({pathname:'/choose-avatar',params:{name:name.trim()}})}}><Text style={{opacity:0}}>הבא</Text></Pressable>
<Pressable style={{position:'absolute',left:5*sx,top:8*sy,width:48*sx,height:48*sy}} onPress={()=>router.back()}><Text style={{opacity:0}}>חזרה</Text></Pressable>
</View>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},input:{position:'absolute',backgroundColor:'transparent',fontWeight:'900',color:'#5c3db3',paddingVertical:0}});
