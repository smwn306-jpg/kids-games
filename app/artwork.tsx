import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { StarCountOverlay } from './components';
import { useAppProgress } from './_layout';

type Rect = { x:number; y:number; w:number; h:number };

export function ArtworkScreen({source, sourceW, sourceH, targets, starBox, background='#dff5d3'}:{source:any;sourceW:number;sourceH:number;targets:Array<{id:string;rect:Rect;path?:string;action?:()=>void}>;starBox?:Rect;background?:string}) {
  const {width,height}=useWindowDimensions();
  const {stars}=useAppProgress();
  const artWidth=width;
  const artHeight=height;
  const sx=artWidth/sourceW, sy=artHeight/sourceH;
  const rect=(r:Rect)=>({position:'absolute' as const,left:r.x*sx,top:r.y*sy,width:r.w*sx,height:r.h*sy});
  return <View style={[styles.stage,{backgroundColor:background}]}>
    <Image
      source={source}
      resizeMode="stretch"
      style={[StyleSheet.absoluteFillObject, { width: '100%', height: '100%' }]}
      pointerEvents="none"
    />
    {starBox && <StarCountOverlay stars={stars} scaleX={sx} scaleY={sy} x={starBox.x} y={starBox.y} width={starBox.w} height={starBox.h}/>} 
    {targets.map(t=><Pressable key={t.id} style={rect(t.rect)} onPress={()=>t.action?t.action():t.path?router.push(t.path as any):router.back()} accessibilityLabel={t.id}/>) }
  </View>
}
const styles=StyleSheet.create({stage:{flex:1,position:'relative'}});
