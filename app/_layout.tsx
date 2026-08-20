import { Stack } from 'expo-router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export type AppProgress = { stars:number; gamesPlayed:number; completed:Set<string> };
type Ctx=AppProgress & { addStars:(n:number)=>void; gameCompleted:(id?:string)=>void; resetProgress:()=>void; isCompleted:(id:string)=>boolean };
const C=createContext<Ctx|null>(null);
const KEY='kids-games-progress-v12';

function loadSaved(): AppProgress {
  try {
    if (typeof globalThis.localStorage === 'undefined') return {stars:0,gamesPlayed:0,completed:new Set()};
    const raw=globalThis.localStorage.getItem(KEY);
    if(!raw) return {stars:0,gamesPlayed:0,completed:new Set()};
    const x=JSON.parse(raw);
    return {stars:Number(x.stars)||0,gamesPlayed:Number(x.gamesPlayed)||0,completed:new Set(Array.isArray(x.completed)?x.completed:[])};
  } catch { return {stars:0,gamesPlayed:0,completed:new Set()}; }
}

export default function Layout(){
 const saved=loadSaved();
 const [stars,setStars]=useState(saved.stars),[gamesPlayed,setGamesPlayed]=useState(saved.gamesPlayed),[completed,setCompleted]=useState<Set<string>>(saved.completed);
 useEffect(()=>{try{if(typeof globalThis.localStorage!=='undefined')globalThis.localStorage.setItem(KEY,JSON.stringify({stars,gamesPlayed,completed:[...completed]}));}catch{}},[stars,gamesPlayed,completed]);
 const value=useMemo(()=>({stars,gamesPlayed,completed,addStars:(n:number)=>setStars(s=>s+Math.max(0,n)),gameCompleted:(id?:string)=>{setGamesPlayed(n=>n+1);if(id)setCompleted(prev=>new Set(prev).add(id));},resetProgress:()=>{setStars(0);setGamesPlayed(0);setCompleted(new Set());},isCompleted:(id:string)=>completed.has(id)}),[stars,gamesPlayed,completed]);
 return <C.Provider value={value}><StatusBar style="dark" translucent backgroundColor="transparent"/><Stack screenOptions={{headerShown:false,animation:'fade'}}/></C.Provider>
}
export function useAppProgress(){const v=useContext(C); if(!v) throw new Error('useAppProgress must be used inside provider'); return v;}
