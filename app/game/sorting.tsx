import {useState} from 'react';
import {Image,Text,View,Pressable} from 'react-native';
import {GameShell,Result} from './GameShell';
import {useAppProgress} from '../_layout';

const items=[
  ['ג׳ירפה','חיות',require('../../assets/animal-giraffe.png')],
  ['תפוח','פירות',require('../../assets/animal-lion.png')],
  ['פיל','חיות',require('../../assets/animal-elephant.png')],
  ['בננה','פירות',require('../../assets/animal-zebra.png')],
  ['אריה','חיות',require('../../assets/animal-lion.png')],
] as const;

export default function Sorting(){
  const{addStars,gameCompleted}=useAppProgress();
  const[i,setI]=useState(0),[score,setScore]=useState(0),[done,setDone]=useState(false);
  const tap=(x:string)=>{
    const n=score+(x===items[i][1]?1:0); setScore(n);
    if(i===items.length-1){addStars(n===items.length?3:n>=3?2:1);gameCompleted('sorting');setDone(true)}
    else setI(v=>v+1);
  };
  const item=items[i];
  return <GameShell title="מיון והתאמה" icon={require('../../assets/icon-sorting.png')} score={score} total={items.length} voiceText={`לאן שייך הפריט? ${item[0]}`}>
    {done?<Result title="מיון מעולה" score={score} stars={score===items.length?3:score>=3?2:1} againPath="/game/sorting"/>:<>
      <Text style={{textAlign:'center',fontSize:22,fontWeight:'900',marginTop:18}}>לאן שייך הפריט?</Text>
      <View style={{backgroundColor:'#fff',borderRadius:28,padding:18,marginTop:16,alignItems:'center'}}>
        <Image source={item[2]} resizeMode="contain" style={{width:145,height:120}}/>
        <Text style={{fontSize:26,fontWeight:'900',color:'#5f6d73',marginTop:6}}>{item[0]}</Text>
      </View>
      <View style={{flexDirection:'row',gap:12,marginTop:18}}>
        {['פירות','חיות'].map(x=><Pressable key={x} onPress={()=>tap(x)} style={{flex:1,backgroundColor:'#fff1c8',borderRadius:22,paddingVertical:18,alignItems:'center',borderWidth:2,borderColor:'#e6c76f'}}><Text style={{fontSize:20,fontWeight:'900',color:'#5b574b'}}>{x}</Text></Pressable>)}
      </View>
    </>}
  </GameShell>
}
