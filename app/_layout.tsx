import { Stack } from 'expo-router';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChildProfile } from '../src/profile-types';

export type AppProgress = { stars:number; gamesPlayed:number; completed:Set<string>; completedLevels:Record<string, number[]>; voiceEnabled:boolean };
type Ctx=AppProgress & {
  addStars:(n:number)=>void; gameCompleted:(id?:string)=>void; completeGame:(id:string,starsAward:number)=>boolean; completeLevel:(gameId:string,level:number,starsAward?:number)=>boolean; resetProgress:()=>void; isCompleted:(id:string)=>boolean; isLevelCompleted:(gameId:string,level:number)=>boolean;
  setVoiceEnabled:(enabled:boolean)=>void; profiles:ChildProfile[]; selectedProfileId:string|null; profilesReady:boolean;
  createProfile:(name:string,avatar:string,color:string)=>Promise<string>; selectProfile:(id:string)=>Promise<void>; deleteProfile:(id:string)=>Promise<void>;
};
const C=createContext<Ctx|null>(null);
const PROFILE_KEY='kids-games-profiles-v1';
const SELECTED_KEY='kids-games-selected-profile-v1';

export default function Layout(){
 const [stars,setStars]=useState(0),[gamesPlayed,setGamesPlayed]=useState(0),[completed,setCompleted]=useState<Set<string>>(new Set()),[completedLevels,setCompletedLevels]=useState<Record<string, number[]>>({}),[voiceEnabled,setVoiceEnabled]=useState(true);
 const completedRef=useRef<Set<string>>(new Set());
 const completedLevelsRef=useRef<Record<string, number[]>>({});
 const [profiles,setProfiles]=useState<ChildProfile[]>([]),[selectedProfileId,setSelectedProfileId]=useState<string|null>(null),[profilesReady,setProfilesReady]=useState(false);
 useEffect(()=>{ (async()=>{ try { const [pRaw,selectedRaw]=await AsyncStorage.multiGet([PROFILE_KEY,SELECTED_KEY]); const parsed=pRaw[1]?JSON.parse(pRaw[1]):[]; setProfiles(Array.isArray(parsed)?parsed:[]); if(selectedRaw[1]) setSelectedProfileId(selectedRaw[1]); } catch {} finally { setProfilesReady(true); } })(); },[]);
 useEffect(()=>{ const active=profiles.find(p=>p.id===selectedProfileId); if(!active)return; setStars(active.stars); setGamesPlayed(active.gamesPlayed); const nextCompleted=new Set(active.completed ?? []); const nextLevels=active.completedLevels ?? {}; setCompleted(nextCompleted); completedRef.current=nextCompleted; setCompletedLevels(nextLevels); completedLevelsRef.current=nextLevels; },[selectedProfileId]);
 useEffect(()=>{ if(!profilesReady || !selectedProfileId)return; const active=profiles.find(p=>p.id===selectedProfileId); if(!active)return; const next=profiles.map(p=>p.id===selectedProfileId?{...p,stars,gamesPlayed,completed:[...completed],completedLevels}:p); AsyncStorage.setItem(PROFILE_KEY,JSON.stringify(next)).catch(()=>{}); },[stars,gamesPlayed,profilesReady,selectedProfileId]);
 const value=useMemo(()=>({
   stars,gamesPlayed,completed,completedLevels,voiceEnabled,profiles,selectedProfileId,profilesReady,
   addStars:(n:number)=>setStars(s=>s+Math.max(0,n)),
   gameCompleted:(id?:string)=>{if(!id){setGamesPlayed(n=>n+1);return;} if(completedRef.current.has(id)) return; const next=new Set(completedRef.current); next.add(id); completedRef.current=next; setCompleted(next); setGamesPlayed(n=>n+1);},
   completeGame:(id:string,starsAward:number)=>{if(completedRef.current.has(id)) return false; const next=new Set(completedRef.current); next.add(id); completedRef.current=next; setCompleted(next); setGamesPlayed(n=>n+1); setStars(s=>s+Math.max(0,starsAward)); return true;},
   completeLevel:(gameId:string,level:number,starsAward=0)=>{const prev=completedLevelsRef.current; const levels=prev[gameId]??[]; if(levels.includes(level)) return false; const nextLevels={...prev,[gameId]:[...levels,level].sort((a,b)=>a-b)}; completedLevelsRef.current=nextLevels; setCompletedLevels(nextLevels); if(starsAward>0) setStars(s=>s+starsAward); return true;},
   resetProgress:()=>{setStars(0);setGamesPlayed(0);const empty=new Set<string>(); completedRef.current=empty; setCompleted(empty); completedLevelsRef.current={}; setCompletedLevels({}); setVoiceEnabled(true);},
   setVoiceEnabled,
   isCompleted:(id:string)=>completedRef.current.has(id),
   isLevelCompleted:(gameId:string,level:number)=>(completedLevelsRef.current[gameId]??[]).includes(level),
   createProfile:async(name:string,avatar:string,color:string)=>{const id=`child-${Date.now()}`; const p:ChildProfile={id,name:name.trim(),avatar,color,stars:0,gamesPlayed:0,createdAt:Date.now(),completed:[],completedLevels:{}}; const next=[...profiles,p].slice(0,6); setProfiles(next); setSelectedProfileId(id); await AsyncStorage.multiSet([[PROFILE_KEY,JSON.stringify(next)],[SELECTED_KEY,id]]); setStars(0);setGamesPlayed(0);const empty=new Set<string>();setCompleted(empty);completedRef.current=empty;setCompletedLevels({});completedLevelsRef.current={}; return id;},
   selectProfile:async(id:string)=>{const p=profiles.find(x=>x.id===id); if(!p)return; setSelectedProfileId(id);setStars(p.stars);setGamesPlayed(p.gamesPlayed);const nextCompleted=new Set(p.completed ?? []);setCompleted(nextCompleted);completedRef.current=nextCompleted;const nextLevels=p.completedLevels??{};setCompletedLevels(nextLevels);completedLevelsRef.current=nextLevels;await AsyncStorage.setItem(SELECTED_KEY,id);},
   deleteProfile:async(id:string)=>{const next=profiles.filter(p=>p.id!==id);setProfiles(next);if(selectedProfileId===id){setSelectedProfileId(next[0]?.id??null);if(!next[0]){setStars(0);setGamesPlayed(0);const empty=new Set<string>();setCompleted(empty);completedRef.current=empty;setCompletedLevels({});completedLevelsRef.current={};}await AsyncStorage.multiSet([[PROFILE_KEY,JSON.stringify(next)],[SELECTED_KEY,next[0]?.id??'']]);}else await AsyncStorage.setItem(PROFILE_KEY,JSON.stringify(next));}
 }),[stars,gamesPlayed,completed,completedLevels,voiceEnabled,profiles,selectedProfileId,profilesReady]);
 return <C.Provider value={value}><StatusBar hidden style="light" backgroundColor="transparent"/><Stack screenOptions={{headerShown:false,animation:'fade'}}/></C.Provider>
}
export function useAppProgress(){const v=useContext(C); if(!v) throw new Error('useAppProgress must be used inside provider'); return v;}
