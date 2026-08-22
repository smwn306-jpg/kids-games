import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { StarCountOverlay } from './components';
import { useAppProgress } from '../../app/_layout';
import type { ReactNode } from 'react';

type Rect = { x:number; y:number; w:number; h:number };

type Target = { id:string; rect:Rect; path?:string; action?:()=>void };

export function ArtworkScreen({source, sourceW, sourceH, targets, starBox, background='#dff5d3', overlays}:{source:any;sourceW:number;sourceH:number;targets:Target[];starBox?:Rect;background?:string;overlays?:ReactNode}) {
  const {width,height}=useWindowDimensions();
  const {stars}=useAppProgress();
  const sx=width/sourceW, sy=height/sourceH;
  const rect=(r:Rect)=>({position:'absolute' as const,left:r.x*sx,top:r.y*sy,width:r.w*sx,height:r.h*sy});
  return <View style={[styles.stage,{backgroundColor:background}]}> 
    <Image source={source} resizeMode="stretch" style={StyleSheet.absoluteFillObject} pointerEvents="none" />
    {overlays}
    {starBox && <StarCountOverlay stars={stars} scaleX={sx} scaleY={sy} x={starBox.x} y={starBox.y} width={starBox.w} height={starBox.h}/>} 
    {targets.map(t=><Pressable key={t.id} style={rect(t.rect)} onPress={()=>t.action?t.action():t.path?router.push(t.path as any):router.back()} accessibilityLabel={t.id}/>) }
  </View>
}
const styles=StyleSheet.create({stage:{flex:1,position:'relative'}});
