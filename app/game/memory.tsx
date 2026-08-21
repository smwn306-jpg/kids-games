import { useState } from 'react';
import { Image, View } from 'react-native';
import { ArtworkScreen } from '../artwork';
import { useAppProgress } from '../_layout';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { speakHebrew } from '../voice';

const W=250,H=454;
const cards=['star','crab','dolphin','crab','star','dolphin','dolphin','star','crab'];
const images={star:require('../../assets/memory-star.png'),crab:require('../../assets/memory-crab.png'),dolphin:require('../../assets/memory-dolphin.png')} as const;
const positions=[[20,113,70,70],[90,113,70,70],[160,113,70,70],[20,188,70,70],[90,188,70,70],[160,188,70,70],[20,264,70,70],[90,264,70,70],[160,264,70,70]] as const;

export default function Memory(){
  const {addStars,gameCompleted,voiceEnabled}=useAppProgress();
  useEffect(()=>{speakHebrew('משחק זיכרון. מצאו את כל הזוגות.', voiceEnabled);},[voiceEnabled]);
  const [first,setFirst]=useState<number|null>(null),[matched,setMatched]=useState<number[]>([]),[busy,setBusy]=useState(false);
  const tap=(i:number)=>{
    if(busy || matched.includes(i) || first===i)return;
    if(first===null){setFirst(i);return;}
    const a=first;
    if(cards[a]===cards[i]){
      const next=[...matched,a,i];setMatched(next);setFirst(null); speakHebrew('נכון! מצאתם זוג.', voiceEnabled);
      if(next.length===cards.length){addStars(3);gameCompleted('memory');}
    }else{
      speakHebrew('כמעט! נסו זוג אחר.', voiceEnabled);
      setBusy(true);setTimeout(()=>{setBusy(false);setFirst(null)},650);
    }
  };
  const visible=new Set([...matched,...(first===null?[]:[first])]);
  const overlays=[...visible].map(i=>{const [x,y,w,h]=positions[i];return <View key={i} pointerEvents="none" style={{position:'absolute',left:x+4,top:y+4,width:w-8,height:h-8,borderRadius:14,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',zIndex:20}}><Image source={images[cards[i] as keyof typeof images]} resizeMode="contain" style={{width:w-22,height:h-22}}/></View>});
  return <ArtworkScreen source={require('../../assets/memory-reference.png')} sourceW={W} sourceH={H} starBox={{x:173,y:31,w:53,h:30}} overlays={overlays} targets={[{id:'back',rect:{x:8,y:10,w:40,h:42},path:'/categories'},...positions.map(([x,y,w,h],i)=>({id:`card-${i}`,rect:{x,y,w,h},action:()=>tap(i)})),{id:'done',rect:{x:24,y:392,w:202,h:42},action:()=>{if(matched.length===cards.length)router.replace('/categories')}}]} />;
}
