import {useState} from 'react';
import {Image,Text,View,Pressable} from 'react-native';
import {GameShell,Result} from '../../src/game/GameShell';
import {useAppProgress} from '../../app/_layout';

const solution=['right','down','right','up','right'];
export default function Mazes(){
 const{addStars,gameCompleted}=useAppProgress();
 const[path,setPath]=useState<string[]>([]); const [wrong,setWrong]=useState(false);
 const next=(x:string)=>{
   const expected=solution[path.length];
   if(x!==expected){setWrong(true);return;}
   const n=[...path,x];setPath(n);setWrong(false);
   if(n.length===solution.length){addStars(3);gameCompleted('mazes');}
 };
 const done=path.length===solution.length;
 return <GameShell title="מבוכים" icon={require('../../assets/icon-mazes.png')} score={path.length} total={solution.length} voiceText="הובילו את החיה אל הדגל. בחרו את הכיוון הנכון." >
 {done?<Result title="הגעתם ליעד!" score={solution.length} stars={3} againPath="/game/mazes"/>:<>
  <Text style={{textAlign:'center',fontSize:22,fontWeight:'900',marginTop:12}}>הובילו את הארנב אל הדגל</Text>
  <View style={{marginTop:14,backgroundColor:'#fff',borderRadius:28,padding:12}}>
    <View style={{height:220,borderRadius:20,backgroundColor:'#dff3c7',overflow:'hidden',position:'relative'}}>
      <View style={{position:'absolute',left:'10%',top:'15%',width:'80%',height:16,backgroundColor:'#fff',borderRadius:10}}/>
      <View style={{position:'absolute',left:'10%',top:'15%',width:16,height:'70%',backgroundColor:'#fff',borderRadius:10}}/>
      <View style={{position:'absolute',left:'35%',top:'15%',width:16,height:'45%',backgroundColor:'#fff',borderRadius:10}}/>
      <View style={{position:'absolute',left:'60%',top:'40%',width:16,height:'45%',backgroundColor:'#fff',borderRadius:10}}/>
      <View style={{position:'absolute',left:'35%',top:'60%',width:'55%',height:16,backgroundColor:'#fff',borderRadius:10}}/>
      <Image source={require('../../assets/avatar-rabbit.png')} resizeMode="contain" style={{position:'absolute',left:'7%',top:'8%',width:48,height:48}}/>
      <Image source={require('../../assets/trophy.png')} resizeMode="contain" style={{position:'absolute',right:'5%',bottom:'5%',width:48,height:48}}/>
    </View>
  </View>
  <View style={{flexDirection:'row',justifyContent:'center',gap:9,marginTop:14,flexWrap:'wrap'}}>{[['left','←'],['right','→'],['up','↑'],['down','↓']].map(([id,label])=><Pressable key={id} onPress={()=>next(id)} style={{width:64,height:56,backgroundColor:'#fff',borderRadius:18,alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'#d8c9ae'}}><Text style={{fontSize:28,fontWeight:'900'}}>{label}</Text></Pressable>)}</View>
  <Text style={{textAlign:'center',marginTop:10,fontWeight:'900'}}>צעדים: {path.length}/{solution.length}</Text>
  {wrong&&<Pressable onPress={()=>setWrong(false)}><Text style={{textAlign:'center',marginTop:6,fontWeight:'900',color:'#d26f67'}}>נסו כיוון אחר</Text></Pressable>}
 </>}
 </GameShell>
}
