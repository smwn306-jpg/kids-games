import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useAppProgress } from './_layout';
import { StarCountOverlay } from './components';
const W=441,H=570;
export default function Levels(){
 const {width,height}=useWindowDimensions(); const {stars}=useAppProgress(); const sx=width/W,sy=height/H;
 const unlocked=Math.min(12,1+Math.floor(stars/3));
 const levels=Array.from({length:12},(_,i)=>i+1);
 const rect=(x:number,y:number,w:number,h:number)=>({position:'absolute' as const,left:x*sx,top:y*sy,width:w*sx,height:h*sy});
 return <View style={s.stage}>
  <Image source={require('../assets/levels-reference.png')} resizeMode="stretch" style={StyleSheet.absoluteFillObject} pointerEvents="none"/>
  <StarCountOverlay stars={stars} scaleX={sx} scaleY={sy} x={344} y={32} width={73} height={31}/>
  <Pressable style={rect(8,10,55,55)} onPress={()=>router.push('/adventure')}/>
  {levels.map((n,i)=>{const x=38+(i%4)*90,y=190+Math.floor(i/4)*96,open=n<=unlocked;return <Pressable key={n} disabled={!open} accessibilityLabel={`level-${n}`} style={rect(x,y,90,86)} onPress={()=>router.push(`/game/animals?level=${n}` as any)}><View style={[s.touch,{opacity:open?0.01:0.01}]} /></Pressable>})}
  <Pressable style={rect(140,475,170,78)} onPress={()=>router.push('/game/animals?level=1' as any)}><View style={s.playHit}/></Pressable>
 </View>
}
const s=StyleSheet.create({stage:{flex:1,backgroundColor:'#dff5d3',position:'relative'},touch:{flex:1},playHit:{flex:1}});
