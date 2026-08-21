import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { StarCountOverlay } from './components';
const W=360,H=570;
export default function Home(){
 const {width,height}=useWindowDimensions(); const {stars,profilesReady,profiles,selectedProfileId}=useAppProgress();
 if(!profilesReady) return <View style={styles.loading}><Image source={require('../assets/home-reference.png')} resizeMode="cover" style={StyleSheet.absoluteFillObject}/></View>;
 if(!profiles.length) { router.replace('/welcome'); return <View style={styles.loading}/>; }
 if(!selectedProfileId) { router.replace('/profiles'); return <View style={styles.loading}/>; }
 const sx=width/W,sy=height/H; const r=(x:number,y:number,w:number,h:number)=>({position:'absolute' as const,left:x*sx,top:y*sy,width:w*sx,height:h*sy});
 return <View style={styles.root}><Image source={require('../assets/home-reference.png')} resizeMode="stretch" style={StyleSheet.absoluteFillObject} pointerEvents="none"/>
  <StarCountOverlay stars={stars} scaleX={sx} scaleY={sy} x={84} y={33} width={74} height={30}/>
  <Pressable accessibilityLabel="החלפת משתמש" style={r(13,10,62,62)} onPress={()=>router.push('/profile')}/>
  <Pressable style={r(68,350,204,68)} onPress={()=>router.push('/categories')}/><Pressable style={r(276,10,65,66)} onPress={()=>router.push('/rewards')}/><Pressable style={r(57,421,76,72)} onPress={()=>router.push('/achievements')}/><Pressable style={r(135,421,76,72)} onPress={()=>router.push('/categories')}/><Pressable style={r(214,421,76,72)} onPress={()=>router.push('/game/draw')}/><Pressable style={r(10,495,116,60)} onPress={()=>router.push('/settings')}/><Pressable style={r(126,495,95,60)} onPress={()=>router.replace('/home')}/><Pressable style={r(218,495,127,60)} onPress={()=>router.push('/parent')}/>
 </View>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#eaf8d6'},loading:{flex:1,backgroundColor:'#dff6ff'}});
