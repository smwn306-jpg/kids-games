import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { useAppProgress } from '../../app/_layout';
import { VoiceButton } from '../ui/VoiceButton';
import { speakHebrew } from '../voice';

const STAR_BADGE = require('../../assets/star-badge-base.png');
const STAR_ONLY = require('../../assets/star-only.png');
const TROPHY = require('../../assets/trophy.png');

type IconSource = number;

export function GameShell({ title, children, score = 0, total = 1, icon, voiceText, autoSpeak = true }: { title:string; children:ReactNode; score?:number; total?:number; icon?:IconSource; voiceText?:string; autoSpeak?:boolean }) {
  const { stars, voiceEnabled } = useAppProgress();
  const { width, height } = useWindowDimensions();
  const progress = Math.max(0, Math.min(100, (score / Math.max(1, total)) * 100));
  const compact = height < 620 || width < 360;
  useEffect(()=>{ if(autoSpeak && voiceText && voiceEnabled) speakHebrew(voiceText, true); },[voiceText,autoSpeak,voiceEnabled]);
  return <View style={s.root}>
    <LinearGradient colors={['#31b7ee','#d9f4fb','#eef8d8']} style={s.bg}>
      <View style={[s.page, compact && s.pageCompact]}>
        <View style={[s.top, compact && s.topCompact]}>
          <Pressable onPress={()=>router.back()} style={s.back} accessibilityLabel="חזרה" accessibilityRole="button">
            <Text style={s.backText}>‹</Text>
          </Pressable>
          <View style={s.heading}>
            {icon ? <Image source={icon} resizeMode="contain" style={[s.headerIcon, compact && s.headerIconCompact]}/> : null}
            <Text numberOfLines={1} style={[s.title, compact && s.titleCompact]}>{title}</Text>
          </View>
          <View style={s.badge}>
            <Image source={STAR_BADGE} resizeMode="stretch" style={StyleSheet.absoluteFillObject}/>
            <Text style={s.badgeNumber}>{stars}</Text>
          </View>
        </View>
        {voiceText ? <View style={[s.voiceRow, compact && s.voiceRowCompact]}><VoiceButton text={voiceText} compact={compact}/></View> : null}
        <View style={s.progressTrack} accessibilityLabel={`התקדמות ${Math.round(progress)} אחוז`}>
          <View style={[s.fill,{width:`${progress}%`}]}/>
        </View>
        <ScrollView contentContainerStyle={[s.content, compact && s.contentCompact]} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </LinearGradient>
  </View>
}

export function Result({title,score,stars,againPath}: {title:string;score:number;stars:number;againPath:string}){
 return <View style={s.result}>
   <View style={s.resultCard}>
     <Image source={TROPHY} resizeMode="contain" style={s.trophy}/>
     <Text style={s.resultTitle}>כל הכבוד!</Text>
     <Text style={s.resultSub}>{title}</Text>
     <View style={s.scorePill}><Text style={s.score}>{score}</Text><Text style={s.scoreLabel}>נקודות</Text></View>
     <View style={s.starsRow} accessibilityLabel={`${stars} כוכבים`}>
       {Array.from({length:3},(_,i)=><Image key={i} source={STAR_ONLY} resizeMode="contain" style={[s.resultStar,{opacity:i<stars?1:0.22}]}/>) }
     </View>
     <Pressable style={s.done} onPress={()=>router.replace(againPath as any)} accessibilityRole="button"><Text style={s.doneText}>שחק שוב</Text></Pressable>
     <Pressable onPress={()=>router.replace('/categories')} style={s.link} accessibilityRole="button"><Text style={s.linkText}>בחר משחק אחר</Text></Pressable>
     <Pressable onPress={()=>router.replace('/home')} style={s.link} accessibilityRole="button"><Text style={s.linkText}>חזרה לבית</Text></Pressable>
   </View>
 </View>
}

export function Choice({label,selected,correct,onPress}:{label:string;selected:boolean;correct?:boolean;onPress:()=>void}){
 return <Pressable onPress={onPress} style={[s.choice,selected&&(correct?s.good:s.bad)]} accessibilityRole="button">
   <Text style={s.choiceText}>{label}</Text>{selected&&<Text style={[s.mark,correct?s.goodMark:s.badMark]}>{correct?'✓':'✗'}</Text>}
 </Pressable>
}

export function NextButton({onPress,label='המשך'}:{onPress:()=>void;label?:string}){
 return <Pressable onPress={onPress} style={s.nextButton} accessibilityRole="button"><Text style={s.nextText}>{label} ←</Text></Pressable>
}

export function useRoundGame(total:number, correctForRound:(i:number)=>string, optionsForRound:(i:number)=>string[], id:string){
 const {addStars,gameCompleted}=useAppProgress();
 const [round,setRound]=useState(0),[score,setScore]=useState(0),[selected,setSelected]=useState<string|null>(null),[finished,setFinished]=useState(false);
 const choose=(a:string)=>{if(selected)return;setSelected(a);if(a===correctForRound(round))setScore(s=>s+1)};
 const next=()=>{if(!selected)return; const earned=score+(selected===correctForRound(round)?1:0); if(round===total-1){const finalScore=earned;const st=finalScore===total?3:finalScore>=Math.ceil(total*.6)?2:1;addStars(st);gameCompleted(id);setScore(finalScore);setFinished(true);}else{setRound(r=>r+1);setSelected(null)}};
 return {round,score,selected,finished,choose,next,stars:score,options:optionsForRound(round)}
}

export const s=StyleSheet.create({
 root:{flex:1},bg:{flex:1},page:{flex:1,paddingHorizontal:16,paddingTop:10},pageCompact:{paddingHorizontal:10,paddingTop:6},top:{flexDirection:'row',alignItems:'center',minHeight:52},topCompact:{minHeight:44},back:{width:46,height:46,borderRadius:16,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',shadowColor:'#6d8d9a',shadowOpacity:.15,shadowRadius:4,elevation:2},backText:{fontSize:38,fontWeight:'900',color:'#477b92',marginTop:-4},heading:{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:6,paddingHorizontal:6},headerIcon:{width:40,height:38},headerIconCompact:{width:34,height:32},title:{textAlign:'center',fontSize:25,fontWeight:'900',color:'#fff',textShadowColor:'#397b94',textShadowRadius:2},titleCompact:{fontSize:20},badge:{width:74,height:30,position:'relative'},badgeNumber:{position:'absolute',left:39,top:4,width:31,color:'#604d2c',fontWeight:'900',fontSize:15,textAlign:'center'},voiceRow:{height:46,alignItems:'center',justifyContent:'center'},voiceRowCompact:{height:42},progressTrack:{height:12,borderRadius:8,backgroundColor:'#9bcbd3',overflow:'hidden',marginTop:10,borderWidth:1,borderColor:'rgba(255,255,255,.65)'},fill:{height:'100%',backgroundColor:'#77c72f',borderRadius:8},content:{flexGrow:1,paddingTop:8,paddingBottom:24},contentCompact:{paddingTop:4,paddingBottom:14},choice:{minHeight:58,borderRadius:20,backgroundColor:'#fff',borderWidth:2,borderColor:'#dfd4bd',alignItems:'center',justifyContent:'center',marginBottom:10,paddingHorizontal:20,shadowColor:'#6b7b82',shadowOpacity:.1,shadowRadius:4,elevation:1},choiceText:{fontSize:20,fontWeight:'900',color:'#4c4b45'},good:{backgroundColor:'#ddf5c1',borderColor:'#76be36'},bad:{backgroundColor:'#ffdede',borderColor:'#e77e7e'},mark:{position:'absolute',right:16,fontSize:24,fontWeight:'900'},goodMark:{color:'#4d9c2a'},badMark:{color:'#cf665f'},nextButton:{alignSelf:'center',backgroundColor:'#75c82f',borderRadius:22,borderWidth:3,borderColor:'#fff',paddingHorizontal:34,paddingVertical:11,marginTop:4,shadowColor:'#4b7d27',shadowOpacity:.18,shadowRadius:4,elevation:2},nextText:{color:'#fff',fontSize:19,fontWeight:'900'},result:{flex:1,alignItems:'center',justifyContent:'center',padding:12},resultCard:{width:'100%',maxWidth:420,backgroundColor:'rgba(255,255,255,.94)',borderRadius:34,padding:20,alignItems:'center',borderWidth:2,borderColor:'#e7dcc6',shadowColor:'#60727b',shadowOpacity:.16,shadowRadius:8,elevation:3},trophy:{width:120,height:102,marginBottom:0},resultTitle:{fontSize:34,fontWeight:'900',color:'#3e5057',marginTop:2},resultSub:{fontSize:19,color:'#6f7c82',marginTop:4,textAlign:'center'},scorePill:{marginTop:10,minWidth:110,borderRadius:18,backgroundColor:'#f4f9e8',paddingHorizontal:18,paddingVertical:7,alignItems:'center',borderWidth:1,borderColor:'#d9e7b8'},score:{fontSize:29,fontWeight:'900',color:'#579f2b'},scoreLabel:{fontSize:13,fontWeight:'800',color:'#7c8a76'},starsRow:{flexDirection:'row',gap:8,marginVertical:10},resultStar:{width:38,height:38},done:{width:'88%',maxWidth:300,alignItems:'center',backgroundColor:'#74c82f',borderRadius:24,paddingVertical:13,borderWidth:3,borderColor:'#fff',marginTop:4,shadowColor:'#4b7d27',shadowOpacity:.2,shadowRadius:5,elevation:2},doneText:{color:'#fff',fontSize:20,fontWeight:'900'},link:{padding:7},linkText:{fontSize:16,fontWeight:'800',color:'#54717b'}
});
