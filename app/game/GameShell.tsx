import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { useAppProgress } from '../_layout';

export function GameShell({title,emoji,children,score=0,total=1}:{title:string;emoji:string;children:ReactNode;score?:number;total?:number}){
 const {stars}=useAppProgress();
 return <View style={s.root}><LinearGradient colors={['#40bdf0','#d7f2f8','#eff8d2']} style={s.bg}><View style={s.page}>
   <View style={s.top}><Pressable onPress={()=>router.back()} style={s.back}><Text style={s.backText}>←</Text></Pressable><Text style={s.title}>{emoji} {title}</Text><View style={s.badge}><Text style={s.badgeText}>⭐ {stars}</Text></View></View>
   <View style={s.progress}><View style={[s.fill,{width:`${Math.max(0,Math.min(100,(score/Math.max(1,total))*100))}%`}]}/></View>
   {children}
 </View></LinearGradient></View>
}

export function Result({title,score,stars,againPath}: {title:string;score:number;stars:number;againPath:string}){
 return <View style={s.result}><Text style={s.trophy}>🏆</Text><Text style={s.resultTitle}>כל הכבוד!</Text><Text style={s.resultSub}>{title}</Text><Text style={s.score}>{score}</Text><Text style={s.stars}>{'⭐'.repeat(stars)}</Text>
   <Pressable style={s.done} onPress={()=>router.replace(againPath as any)}><Text style={s.doneText}>שחק שוב</Text></Pressable>
   <Pressable onPress={()=>router.replace('/categories')} style={s.link}><Text style={s.linkText}>בחר משחק אחר</Text></Pressable>
   <Pressable onPress={()=>router.replace('/')} style={s.link}><Text style={s.linkText}>חזרה לבית</Text></Pressable>
 </View>
}

export function Choice({label,selected,correct,onPress}:{label:string;selected:boolean;correct?:boolean;onPress:()=>void}){return <Pressable onPress={onPress} style={[s.choice,selected&&(correct?s.good:s.bad)]}><Text style={s.choiceText}>{label}</Text>{selected&&<Text style={s.mark}>{correct?'✓':'✗'}</Text>}</Pressable>}

export function useRoundGame(total:number, correctForRound:(i:number)=>string, optionsForRound:(i:number)=>string[], id:string){
 const {addStars,gameCompleted}=useAppProgress(); const [round,setRound]=useState(0),[score,setScore]=useState(0),[selected,setSelected]=useState<string|null>(null),[finished,setFinished]=useState(false);
 const choose=(a:string)=>{if(selected)return;setSelected(a);if(a===correctForRound(round))setScore(s=>s+1)};
 const next=()=>{if(!selected)return; if(round===total-1){const earned=score+(selected===correctForRound(round)?1:0);const st=earned===total?3:earned>=Math.ceil(total*.6)?2:1;addStars(st);gameCompleted(id);setFinished(true);}else{setRound(r=>r+1);setSelected(null)}};
 return {round,score,selected,finished,choose,next,stars:score+(selected===correctForRound(round)?1:0),options:optionsForRound(round)}
}

export const s=StyleSheet.create({root:{flex:1},bg:{flex:1},page:{flex:1,padding:16},top:{flexDirection:'row',alignItems:'center',gap:10},back:{width:46,height:46,borderRadius:16,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'},backText:{fontSize:30,fontWeight:'900',color:'#477b92'},title:{flex:1,textAlign:'center',fontSize:27,fontWeight:'900',color:'#fff',textShadowColor:'#397b94',textShadowRadius:2},badge:{backgroundColor:'#fff6d8',borderRadius:18,paddingHorizontal:10,paddingVertical:9},badgeText:{fontWeight:'900',color:'#604d2c'},progress:{height:12,borderRadius:8,backgroundColor:'#9bcbd3',overflow:'hidden',marginTop:14},fill:{height:'100%',backgroundColor:'#77c72f'},choice:{minHeight:58,borderRadius:20,backgroundColor:'#fff',borderWidth:2,borderColor:'#dfd4bd',alignItems:'center',justifyContent:'center',marginBottom:10,paddingHorizontal:20},choiceText:{fontSize:20,fontWeight:'900',color:'#4c4b45'},good:{backgroundColor:'#ddf5c1',borderColor:'#76be36'},bad:{backgroundColor:'#ffdede',borderColor:'#e77e7e'},mark:{position:'absolute',right:16,fontSize:24,fontWeight:'900'},done:{alignSelf:'center',backgroundColor:'#74c82f',borderRadius:24,paddingHorizontal:38,paddingVertical:14,borderWidth:3,borderColor:'#fff',marginTop:20},doneText:{color:'#fff',fontSize:20,fontWeight:'900'},result:{flex:1,alignItems:'center',justifyContent:'center',padding:24},trophy:{fontSize:80},resultTitle:{fontSize:36,fontWeight:'900',color:'#3e5057',marginTop:10},resultSub:{fontSize:20,color:'#6f7c82',marginTop:6},score:{fontSize:32,fontWeight:'900',color:'#579f2b',marginTop:10},stars:{fontSize:32,marginVertical:14},link:{padding:10},linkText:{fontSize:17,fontWeight:'800',color:'#54717b'}});
