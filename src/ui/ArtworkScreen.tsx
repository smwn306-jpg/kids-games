import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { StarCountOverlay } from './components';
import { useAppProgress } from '../../app/_layout';
import { createReferenceLayout, type ReferenceRect } from './layout';
import type { ReactNode } from 'react';

type Target = { id:string; rect:ReferenceRect; path?:string; action?:()=>void };

type Props = {
  source:any;
  sourceW:number;
  sourceH:number;
  targets:Target[];
  starBox?:ReferenceRect;
  background?:string;
  overlays?:ReactNode | ((ctx:{scale:number;offsetX:number;offsetY:number})=>ReactNode);
};

/** Shared reference canvas. Artwork, overlays and touch targets use one transform. */
export function ArtworkScreen({source, sourceW, sourceH, targets, starBox, background='#dff5d3', overlays}:Props) {
  const {width,height}=useWindowDimensions();
  const {stars}=useAppProgress();
  const layout=createReferenceLayout(sourceW, sourceH, width, height);

  return <View style={[styles.stage,{backgroundColor:background}]}>
    <View pointerEvents="none" style={{position:'absolute',left:layout.offsetX,top:layout.offsetY,width:layout.canvasWidth,height:layout.canvasHeight}}>
      <Image source={source} resizeMode="cover" style={StyleSheet.absoluteFillObject} />
    </View>
    {starBox && <StarCountOverlay stars={stars} x={starBox.x} y={starBox.y} width={starBox.w} height={starBox.h} scaleX={layout.scale} scaleY={layout.scale} offsetX={layout.offsetX} offsetY={layout.offsetY}/>} 
    {overlays && <View pointerEvents="none" style={StyleSheet.absoluteFillObject}>{typeof overlays==='function' ? overlays({scale:layout.scale,offsetX:layout.offsetX,offsetY:layout.offsetY}) : overlays}</View>}
    {targets.map(t=><Pressable key={t.id} style={[styles.target,layout.rectToScreen(t.rect)]} onPress={()=>t.action?t.action():t.path?router.push(t.path as any):router.back()} accessibilityLabel={t.id}/>) }
  </View>
}
const styles=StyleSheet.create({stage:{flex:1,position:'relative',overflow:'hidden'},target:{position:'absolute'}});
