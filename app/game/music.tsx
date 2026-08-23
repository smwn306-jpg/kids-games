import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { GameShell, Result } from '../../src/game/GameShell';
import { useAppProgress } from '../../app/_layout';
import { speakHebrew, stopSpeech } from '../../src/voice';

const seq=['1','3','2','4'];
export default function Music(){
  const {completeGame,voiceEnabled}=useAppProgress();
  const [input,setInput]=useState<string[]>([]); const [wrong,setWrong]=useState(false);
  const [playing,setPlaying]=useState(false);
  useEffect(()=>()=>stopSpeech(),[]);
  const playSequence=()=>{ if(playing) return; setPlaying(true); speakHebrew('הקשיבו לקצב: אחת... שלוש... שתיים... ארבע', voiceEnabled); setTimeout(()=>setPlaying(false),3200); };
  useEffect(()=>{ if(voiceEnabled) playSequence(); },[voiceEnabled]);
  const tap=(x:string)=>{ if(done || input.length>=seq.length)return; const n=[...input,x]; setInput(n); setWrong(false); if(n.length===seq.length){if(n.join('')===seq.join('')){completeGame('music',3)}else setWrong(true)}};
  const done=input.length===seq.length&&input.join('')===seq.join('');
  return <GameShell title="מוזיקה וקצב" icon={require('../../assets/icon-music.png')} score={input.filter((x,i)=>x===seq[i]).length} total={seq.length} autoSpeak={false}>
    {done?<Result title="קצב מושלם!" score={seq.length} stars={3} againPath="/game/music"/>:<>
      <Text style={{textAlign:'center',fontSize:22,fontWeight:'900',marginTop:18}}>הקשיבו וזכרו את הקצב</Text>
      <Pressable onPress={playSequence} style={{alignSelf:'center',marginTop:10,backgroundColor:'#fff',borderRadius:18,borderWidth:2,borderColor:'#cfe0e6',paddingHorizontal:18,paddingVertical:10}}><Text style={{fontSize:17,fontWeight:'900',color:'#477b92'}}>{playing?'משמיע...':'השמיעו שוב'}</Text></Pressable>
      <View style={{backgroundColor:'#fff',borderRadius:28,padding:22,marginTop:16,alignItems:'center'}}>
        <Text style={{fontSize:44,fontWeight:'900',color:'#7d5bc2'}}>{playing?'♪  ♪  ♪  ♪':'♫'}</Text>
        <Text style={{textAlign:'center',marginTop:10,fontWeight:'800',color:'#66757c'}}>הקשיבו לרצף, ואז הקישו עליו מהזיכרון</Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center',gap:10,marginTop:18}}>{['1','2','3','4'].map(x=><Pressable key={x} onPress={()=>tap(x)} style={{width:62,height:62,borderRadius:20,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderWidth:2,borderColor:'#e1d5bf'}}><Text style={{fontSize:26,fontWeight:'900'}}>{x}</Text></Pressable>)}</View>
      <Text style={{textAlign:'center',marginTop:12,fontWeight:'800'}}>הבחירה שלך: {input.join(' ')||'—'}</Text>
      {wrong&&<Pressable onPress={()=>setInput([])}><Text style={{textAlign:'center',marginTop:10,fontWeight:'900',color:'#c96b62'}}>לא בדיוק — נסו שוב</Text></Pressable>}
    </>}
  </GameShell>
}
