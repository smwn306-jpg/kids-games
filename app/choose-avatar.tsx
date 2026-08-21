import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
const W=259,H=500;
const avatars=[['lion','אריה'],['rabbit','ארנב'],['elephant','פיל'],['panda','פנדה'],['monkey','קוף'],['giraffe','ג׳ירפה'],['fox','שועל'],['penguin','פינגווין'],['bear','דוב']];
export default function ChooseAvatar(){const {width,height}=useWindowDimensions();const sx=width/W,sy=height/H;const{name}=useLocalSearchParams<{name:string}>();const[selected,setSelected]=useState('lion');const positions=[[18,136],[94,136],[170,136],[18,220],[94,220],[170,220],[18,307],[94,307],[170,307]];return <View style={s.root}>
<Image source={require('../assets/avatar-reference-clean.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/>
{avatars.map(([key,label],i)=>{const[x,y]=positions[i];return <Pressable key={key} accessibilityLabel={label} onPress={()=>setSelected(key)} style={{position:'absolute',left:(x-2)*sx,top:(y-2)*sy,width:70*sx,height:70*sy,borderRadius:16,borderWidth:selected===key?3:0,borderColor:'#71c33a'}}/>})}
<Pressable style={{position:'absolute',left:47*sx,top:392*sy,width:164*sx,height:54*sy}} onPress={()=>router.push({pathname:'/choose-color',params:{name:String(name||''),avatar:selected}})}><Text style={{opacity:0}}>הבא</Text></Pressable>
</View>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'}});
