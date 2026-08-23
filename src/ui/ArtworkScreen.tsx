import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { StarCountOverlay } from './components';
import { useAppProgress } from '../../app/_layout';
import type { ReactNode } from 'react';

type Rect = { x:number; y:number; w:number; h:number };
type Target = { id:string; rect:Rect; path?:string; action?:()=>void };

type Props = {
  source:any;
  sourceW:number;
  sourceH:number;
  targets:Target[];
  starBox?:Rect;
  background?:string;
  overlays?:ReactNode | ((ctx:{scale:number;offsetX:number;offsetY:number})=>ReactNode);
};

/**
 * Displays a reference artwork as a real full-screen canvas without stretching it.
 * The logical design coordinates remain stable; the whole canvas is uniformly
 * scaled and centered, while the surrounding area is filled by the background.
 */
export function ArtworkScreen({source, sourceW, sourceH, targets, starBox, background='#dff5d3', overlays}:Props) {
  const {width,height}=useWindowDimensions();
  const {stars}=useAppProgress();
  const scale=Math.max(width/sourceW,height/sourceH);
  const canvasW=sourceW*scale;
  const canvasH=sourceH*scale;
  const offsetX=(width-canvasW)/2;
  const offsetY=(height-canvasH)/2;
  const rect=(r:Rect)=>({
    position:'absolute' as const,
    left:offsetX+r.x*scale,
    top:offsetY+r.y*scale,
    width:r.w*scale,
    height:r.h*scale,
  });
  return <View style={[styles.stage,{backgroundColor:background}]}>
    <View pointerEvents="none" style={{position:'absolute',left:offsetX,top:offsetY,width:canvasW,height:canvasH}}><Image source={source} resizeMode="cover" style={StyleSheet.absoluteFillObject} /></View>
    {starBox && <StarCountOverlay stars={stars} x={starBox.x} y={starBox.y} width={starBox.w} height={starBox.h} scaleX={scale} scaleY={scale} offsetX={offsetX} offsetY={offsetY}/>} 
    {overlays && <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>{typeof overlays==='function' ? overlays({scale,offsetX,offsetY}) : overlays}</View>}
    {targets.map(t=><Pressable key={t.id} style={rect(t.rect)} onPress={()=>t.action?t.action():t.path?router.push(t.path as any):router.back()} accessibilityLabel={t.id}/>) }
  </View>
}
const styles=StyleSheet.create({stage:{flex:1,position:'relative',overflow:'hidden'}});
