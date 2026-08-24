import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { createReferenceLayout } from '../src/ui/layout';
const W=687,H=493;
const avatars:Record<string,any>={lion:require('../assets/avatar-lion.png'),rabbit:require('../assets/avatar-rabbit.png'),elephant:require('../assets/avatar-elephant.png'),panda:require('../assets/avatar-panda.png'),monkey:require('../assets/avatar-monkey.png'),giraffe:require('../assets/avatar-giraffe.png'),fox:require('../assets/avatar-fox.png'),penguin:require('../assets/avatar-penguin.png'),bear:require('../assets/avatar-bear.png')};
export default function Profile(){
  const{width,height}=useWindowDimensions();const layout=createReferenceLayout(W,H,width,height);const{profiles,selectedProfileId,stars}=useAppProgress();const p=profiles.find(x=>x.id===selectedProfileId);if(!p)return null;const rect=(x:number,y:number,w:number,h:number)=>layout.rectToScreen({x,y,w,h});return <View style={s.root}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}><Image source={require('../assets/profile-home-reference-clean-ui.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/></View>
    <View pointerEvents="none" style={[{borderRadius:42*layout.scale,overflow:'hidden'},rect(20,12,82,82)]}><Image source={avatars[p.avatar]||avatars.lion} style={{width:'100%',height:'100%'}}/></View>
    <Text pointerEvents="none" style={[s.greeting,rect(102,18,200,34),{fontSize:27*layout.scale}]}>שלום {p.name}!</Text>
    <Text pointerEvents="none" style={[s.sub,rect(103,56,250,25),{fontSize:15*layout.scale}]}>איזה כיף לראות אותך שוב!</Text>
    <View pointerEvents="none" style={[s.starVisual,rect(514,22,112,46)]}><Image source={require('../assets/star-badge-base.png')} style={StyleSheet.absoluteFillObject} resizeMode="cover"/><Text style={[s.starNumber,{left:58*layout.scale,top:8*layout.scale,width:45*layout.scale,fontSize:18*layout.scale}]}>{stars}</Text></View>
    <Pressable style={rect(474,104,136,248)} onPress={()=>router.push('/categories')}/>
    <Pressable style={rect(205,388,116,92)} onPress={()=>router.push('/room')}/>
    <Pressable style={rect(325,388,112,92)} onPress={()=>router.push('/achievements')}/>
    <Pressable style={rect(438,388,112,92)} onPress={()=>router.push('/report')}/>
    <Pressable style={rect(550,388,112,92)} onPress={()=>router.push('/settings')}/>
    <Pressable style={rect(8,390,80,80)} onPress={()=>router.push('/profiles')} />
  </View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},greeting:{position:'absolute',fontWeight:'900',color:'#4b32a5'},sub:{position:'absolute',fontWeight:'800',color:'#43367e'},starVisual:{position:'absolute'},starNumber:{position:'absolute',textAlign:'center',fontWeight:'900',color:'#604d2c'}});
