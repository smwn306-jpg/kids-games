import { useState } from 'react';
import { View } from 'react-native';
import { ArtworkScreen } from '../../src/ui/ArtworkScreen';
import { useAppProgress } from '../../app/_layout';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { speakHebrew } from '../../src/voice';

const W=250,H=454;
const colors=['#e44b4b','#f29c32','#f1d24b','#6dbb55','#4b9fd1','#8769c9','#7c5a42','#333'];
const paletteX=[6,39,72,105,138,171,204,232];
const paintSpots=[[52,170],[86,160],[122,155],[158,164],[91,205],[128,210],[160,225],[69,245],[104,255],[140,260],[93,295],[150,300]] as const;

export default function Draw(){
  const {addStars,gameCompleted,voiceEnabled}=useAppProgress();
  useEffect(()=>{speakHebrew('צבעו את האריה. בחרו צבע והתחילו לצבוע.', voiceEnabled);},[voiceEnabled]);
  const [color,setColor]=useState(colors[0]);
  const [painted,setPainted]=useState<Record<number,string>>({});
  const [finished,setFinished]=useState(false);
  const paint=(i:number)=>{
    if(finished)return;
    setPainted(p=>({...p,[i]:color}));
    if(Object.keys(painted).length+1===8){addStars(2);gameCompleted('draw');setFinished(true);}
  };
  const targets=[
    {id:'back',rect:{x:8,y:10,w:42,h:42},path:'/categories'},
    ...paletteX.map((x,i)=>({id:`color-${i}`,rect:{x,y:32,w:28,h:28},action:()=>setColor(colors[i])})),
    ...paintSpots.map(([x,y],i)=>({id:`paint-${i}`,rect:{x,y,w:28,h:28},action:()=>paint(i)})),
    {id:'finish',rect:{x:24,y:398,w:220,h:48},action:()=>{if(finished)router.replace('/categories')}}
  ];
  const overlays=Object.entries(painted).map(([i,c])=>{const [x,y]=paintSpots[Number(i)];return <View key={i} pointerEvents="none" style={{position:'absolute',left:x+5,top:y+5,width:18,height:18,borderRadius:9,backgroundColor:c,zIndex:10}}/>});
  return <ArtworkScreen source={require('../../assets/draw-reference.png')} sourceW={W} sourceH={H} targets={targets} overlays={overlays} />;
}
