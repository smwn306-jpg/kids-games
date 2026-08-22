import { useState } from 'react';
import { Image, Text, View, Pressable } from 'react-native';
import { GameShell, Result } from '../../src/game/GameShell';
import { useAppProgress } from '../../app/_layout';

const spots=[0,1,2,3,4,5] as const;
const animals=[
  require('../../assets/animal-giraffe.png'), require('../../assets/animal-elephant.png'), require('../../assets/animal-lion.png'),
  require('../../assets/animal-zebra.png'), require('../../assets/animal-giraffe.png'), require('../../assets/animal-lion.png')
];
const differences=new Set([1,4,5]);

export default function Differences(){
  const {addStars,gameCompleted}=useAppProgress();
  const [found,setFound]=useState<number[]>([]);
  const tap=(i:number)=>{
    if(found.includes(i)) return;
    if(!differences.has(i)) return;
    const next=[...found,i]; setFound(next);
    if(next.length===differences.size){addStars(3);gameCompleted('differences');}
  };
  const done=found.length===differences.size;
  return <GameShell title="מצא את ההבדלים" icon={require('../../assets/icon-differences.png')} score={found.length} total={3} voiceText="מצאו שלושה הבדלים בין שתי התמונות" >
    {done?<Result title="מצאתם את כל ההבדלים" score={3} stars={3} againPath="/game/differences"/>:<>
      <Text style={{textAlign:'center',fontSize:22,fontWeight:'900',marginTop:14}}>מצאו 3 הבדלים</Text>
      <View style={{backgroundColor:'#fff',borderRadius:28,padding:14,marginTop:14}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:8}}><Text style={{fontWeight:'900',color:'#5f7b84'}}>תמונה א׳</Text><Text style={{fontWeight:'900',color:'#5f7b84'}}>תמונה ב׳</Text></View>
        <View style={{flexDirection:'row',gap:8}}>
          <View style={{flex:1,gap:8}}>{spots.map(i=><View key={i} style={{height:58,borderRadius:16,backgroundColor:'#e8f7ff',alignItems:'center',justifyContent:'center'}}><Image source={animals[i]} resizeMode="contain" style={{width:58,height:48}}/></View>)}</View>
          <View style={{flex:1,gap:8}}>{spots.map(i=><Pressable key={i} onPress={()=>tap(i)} style={{height:58,borderRadius:16,backgroundColor:found.includes(i)?'#d8f5b8':'#e8f7ff',alignItems:'center',justifyContent:'center',borderWidth:found.includes(i)?3:0,borderColor:'#76bf36'}}><Image source={animals[i]} resizeMode="contain" style={{width:58,height:48,transform:i===1||i===4||i===5?[{scaleX:-1}]:undefined}}/></Pressable>)}</View>
        </View>
      </View>
    </>}
  </GameShell>
}
