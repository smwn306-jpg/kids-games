import { Stack } from 'expo-router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChildProfile } from '../src/profile-types';

export type AppProgress = { stars:number; gamesPlayed:number; completed:Set<string>; voiceEnabled:boolean };
type Ctx=AppProgress & {
  addStars:(n:number)=>void; gameCompleted:(id?:string)=>void; resetProgress:()=>void; isCompleted:(id:string)=>boolean;
  setVoiceEnabled:(enabled:boolean)=>void; profiles:ChildProfile[]; selectedProfileId:string|null; profilesReady:boolean;
  createProfile:(name:string,avatar:string,color:string)=>Promise<string>; selectProfile:(id:string)=>Promise<void>; deleteProfile:(id:string)=>Promise<void>;
};
const C=createContext<Ctx|null>(null);
const PROFILE_KEY='kids-games-profiles-v1';
const SELECTED_KEY='kids-games-selected-profile-v1';

export default function Layout(){
 const [stars,setStars]=useState(0),[gamesPlayed,setGamesPlayed]=useState(0),[completed,setCompleted]=useState<Set<string>>(new Set()),[voiceEnabled,setVoiceEnabled]=useState(true);
 const [profiles,setProfiles]=useState<ChildProfile[]>([]),[selectedProfileId,setSelectedProfileId]=useState<string|null>(null),[profilesReady,setProfilesReady]=useState(false);
 useEffect(()=>{ (async()=>{ try { const p=await AsyncStorage.getItem(PROFILE_KEY); if(p) setProfiles(JSON.parse(p)); } catch {} finally { setProfilesReady(true); } })(); },[]);
 useEffect(()=>{ const active=profiles.find(p=>p.id===selectedProfileId); if(!active)return; setStars(active.stars); setGamesPlayed(active.gamesPlayed); setCompleted(new Set(active.completed ?? [])); },[selectedProfileId]);
 useEffect(()=>{ if(!profilesReady || !selectedProfileId)return; const active=profiles.find(p=>p.id===selectedProfileId); if(!active)return; const next=profiles.map(p=>p.id===selectedProfileId?{...p,stars,gamesPlayed,completed:[...completed]}:p); AsyncStorage.setItem(PROFILE_KEY,JSON.stringify(next)).catch(()=>{}); },[stars,gamesPlayed,profilesReady,selectedProfileId]);
 const value=useMemo(()=>({
   stars,gamesPlayed,completed,voiceEnabled,profiles,selectedProfileId,profilesReady,
   addStars:(n:number)=>setStars(s=>s+Math.max(0,n)),
   gameCompleted:(id?:string)=>{setGamesPlayed(n=>n+1);if(id)setCompleted(prev=>new Set(prev).add(id));},
   resetProgress:()=>{setStars(0);setGamesPlayed(0);setCompleted(new Set());setVoiceEnabled(true);},
   setVoiceEnabled,
   isCompleted:(id:string)=>completed.has(id),
   createProfile:async(name:string,avatar:string,color:string)=>{const id=`child-${Date.now()}`; const p:ChildProfile={id,name:name.trim(),avatar,color,stars:0,gamesPlayed:0,createdAt:Date.now(),completed:[]}; const next=[...profiles,p].slice(0,6); setProfiles(next); setSelectedProfileId(id); await AsyncStorage.multiSet([[PROFILE_KEY,JSON.stringify(next)],[SELECTED_KEY,id]]); setStars(0);setGamesPlayed(0);setCompleted(new Set()); return id;},
   selectProfile:async(id:string)=>{const p=profiles.find(x=>x.id===id); if(!p)return; setSelectedProfileId(id);setStars(p.stars);setGamesPlayed(p.gamesPlayed);setCompleted(new Set(p.completed ?? []));await AsyncStorage.setItem(SELECTED_KEY,id);},
   deleteProfile:async(id:string)=>{const next=profiles.filter(p=>p.id!==id);setProfiles(next);if(selectedProfileId===id){setSelectedProfileId(next[0]?.id??null);await AsyncStorage.multiSet([[PROFILE_KEY,JSON.stringify(next)],[SELECTED_KEY,next[0]?.id??'']]);}else await AsyncStorage.setItem(PROFILE_KEY,JSON.stringify(next));}
 }),[stars,gamesPlayed,completed,voiceEnabled,profiles,selectedProfileId,profilesReady]);
 return <C.Provider value={value}><StatusBar style="dark" translucent backgroundColor="transparent"/><Stack screenOptions={{headerShown:false,animation:'fade'}}/></C.Provider>
}
export function useAppProgress(){const v=useContext(C); if(!v) throw new Error('useAppProgress must be used inside provider'); return v;}
