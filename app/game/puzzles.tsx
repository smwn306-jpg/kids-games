import {useState} from 'react';
import {Image,Text,View,Pressable} from 'react-native';
import {GameShell,Result} from '../../src/game/GameShell';
import {useAppProgress} from '../../app/_layout';
const target=['zebra','giraffe','lion'];
const assets={zebra:require('../../assets/animal-zebra.png'),giraffe:require('../../assets/animal-giraffe.png'),lion:require('../../assets/animal-lion.png')};
export default function Puzzles(){
 const{addStars,gameCompleted}=useAppProgress(); const[order,setOrder]=useState(['lion','zebra','giraffe']); const[done,setDone]=useState(false);
 const swap=(i:number)=>{const a=[...order];const j=a.indexOf(target[i]);[a[i],a[j]]=[a[j],a[i]];setOrder(a);if(a.join('')===target.join('')){addStars(3);gameCompleted('puzzles');setDone(true)}};
 return <GameShell title="פאזלים" icon={require('../../assets/icon-puzzles.png')} score={done?3:0} total={3} voiceText="סדרו את החיות לפי הסדר" >
 {done?<Result title="הפאזל הושלם" score={3} stars={3} againPath="/game/puzzles"/>:<>
  <Text style={{textAlign:'center',fontSize:23,fontWeight:'900',marginTop:20}}>סדרו את החיות לפי הסדר</Text>
  <View style={{backgroundColor:'#fff',borderRadius:28,padding:16,marginTop:16}}>
    <View style={{flexDirection:'row',justifyContent:'center',gap:10}}>{order.map((x,i)=><Pressable key={i} onPress={()=>swap(i)} style={{width:84,height:112,borderRadius:20,backgroundColor:'#fff7df',borderWidth:2,borderColor:'#e3c978',alignItems:'center',justifyContent:'center'}}><Image source={assets[x as keyof typeof assets]} resizeMode="contain" style={{width:66,height:66}}/><Text style={{fontWeight:'900',color:'#6d6654'}}>מקום {i+1}</Text></Pressable>)}</View>
    <Text style={{textAlign:'center',marginTop:12,color:'#718087',fontWeight:'800'}}>לחצו על הכרטיס במקום שאליו החיה צריכה לעבור</Text>
  </View>
 </>}
 </GameShell>
}
