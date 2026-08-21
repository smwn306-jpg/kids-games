import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
const W=687,H=493;
const avatars:Record<string,any>={lion:require('../assets/avatar-lion.png'),rabbit:require('../assets/avatar-rabbit.png'),elephant:require('../assets/avatar-elephant.png'),panda:require('../assets/avatar-panda.png'),monkey:require('../assets/avatar-monkey.png'),giraffe:require('../assets/avatar-giraffe.png'),fox:require('../assets/avatar-fox.png'),penguin:require('../assets/avatar-penguin.png'),bear:require('../assets/avatar-bear.png')};
export default function Profile(){const{width,height}=useWindowDimensions();const sx=width/W,sy=height/H;const{profiles,selectedProfileId,stars}=useAppProgress();const p=profiles.find(x=>x.id===selectedProfileId);if(!p)return null;return <View style={s.root}>
<Image source={require('../assets/profile-home-reference.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/>
<View pointerEvents="none" style={{position:'absolute',left:20*sx,top:12*sy,width:82*sx,height:82*sy,borderRadius:42*sy,overflow:'hidden'}}><Image source={avatars[p.avatar]||avatars.lion} style={{width:'100%',height:'100%'}}/></View>
<Text pointerEvents="none" style={[s.greeting,{left:102*sx,top:18*sy,width:200*sx,fontSize:27*Math.min(sx,sy)}]}>שלום {p.name}!</Text>
<Text pointerEvents="none" style={[s.sub,{left:103*sx,top:56*sy,width:250*sx,fontSize:15*Math.min(sx,sy)}]}>איזה כיף לראות אותך שוב!</Text>
<View pointerEvents="none" style={{position:'absolute',left:514*sx,top:22*sy,width:112*sx,height:46*sy}}><View style={s.starVisual}><Image source={require('../assets/star-badge-base.png')} style={StyleSheet.absoluteFillObject} resizeMode="stretch"/><Text style={s.starNumber}>{stars}</Text></View></View>
<Pressable style={{position:'absolute',left:474*sx,top:104*sy,width:136*sx,height:248*sy}} onPress={()=>router.push('/categories')}/>
<Pressable style={{position:'absolute',left:205*sx,top:388*sy,width:116*sx,height:92*sy}} onPress={()=>router.push('/room')}/>
<Pressable style={{position:'absolute',left:325*sx,top:388*sy,width:112*sx,height:92*sy}} onPress={()=>router.push('/achievements')}/>
<Pressable style={{position:'absolute',left:438*sx,top:388*sy,width:112*sx,height:92*sy}} onPress={()=>router.push('/report')}/>
<Pressable style={{position:'absolute',left:550*sx,top:388*sy,width:112*sx,height:92*sy}} onPress={()=>router.push('/settings')}/>
<Pressable style={{position:'absolute',left:8*sx,top:390*sy,width:80*sx,height:80*sy}} onPress={()=>router.push('/profiles')} />
</View>}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'},greeting:{position:'absolute',fontWeight:'900',color:'#4b32a5'},sub:{position:'absolute',fontWeight:'800',color:'#43367e'},starVisual:{width:112,height:46,position:'relative'},starNumber:{position:'absolute',left:58,top:8,width:45,textAlign:'center',fontWeight:'900',fontSize:18,color:'#604d2c'}});
