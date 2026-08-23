import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
const W=403,H=493;
const cardPos=[[26,120],[153,120],[279,120]];
const avatars:Record<string,any>={lion:require('../assets/avatar-lion.png'),rabbit:require('../assets/avatar-rabbit.png'),elephant:require('../assets/avatar-elephant.png'),panda:require('../assets/avatar-panda.png'),monkey:require('../assets/avatar-monkey.png'),giraffe:require('../assets/avatar-giraffe.png'),fox:require('../assets/avatar-fox.png'),penguin:require('../assets/avatar-penguin.png'),bear:require('../assets/avatar-bear.png')};
export default function Profiles(){const{width,height}=useWindowDimensions();const sx=width/W,sy=height/H;const{profiles,selectProfile,selectedProfileId}=useAppProgress();return <View style={s.root}>
<Image source={require('../assets/profiles-reference-clean.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/>
{profiles.map((p,i)=>{if(i>2)return null;const[x,y]=cardPos[i];return <Pressable key={p.id} style={{position:'absolute',left:x*sx,top:y*sy,width:113*sx,height:184*sy,borderRadius:18}} onPress={async()=>{await selectProfile(p.id);router.replace('/home')}}>
<Image source={avatars[p.avatar]||avatars.lion} style={{position:'absolute',left:8*sx,top:10*sy,width:82*sx,height:82*sy}} resizeMode="cover"/>{selectedProfileId===p.id&&<Image source={require('../assets/selected-check.png')} style={{position:'absolute',right:6*sx,top:6*sy,width:26*sx,height:26*sy}} resizeMode="contain"/>}<Text style={[s.name,{left:7*sx,top:98*sy,width:90*sx,fontSize:17*Math.min(sx,sy)}]}>{p.name}</Text><View pointerEvents="none" style={{position:'absolute',left:18*sx,top:128*sy,width:76*sx,height:28*sy}}><Image source={require('../assets/star-badge-base.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/><Text style={[s.stars,{left:39*sx,top:3*sy,width:31*sx,fontSize:14*Math.min(sx,sy)}]}>{p.stars}</Text></View></Pressable>})}
<Pressable style={{position:'absolute',left:106*sx,top:330*sy,width:190*sx,height:95*sy}} onPress={()=>router.push(profiles.length>=3?'/profiles-more':'/create-profile')}><Text style={{opacity:0}}>ילד חדש</Text></Pressable>
<Pressable style={{position:'absolute',left:350*sx,top:16*sy,width:40*sx,height:40*sy}} onPress={()=>router.back()}><Text style={{opacity:0}}>הגדרות</Text></Pressable>
</View>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},name:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#5141a5'},stars:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#7b633b'}});
