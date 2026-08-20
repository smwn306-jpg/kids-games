import { Stack } from 'expo-router';
import { createContext, useContext, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export type AppProgress = { stars:number; gamesPlayed:number; completed:Set<string> };
type Ctx=AppProgress & { addStars:(n:number)=>void; gameCompleted:(id?:string)=>void; resetProgress:()=>void };
const C=createContext<Ctx|null>(null);
export function useAppProgress(){const v=useContext(C); if(!v) throw new Error('useAppProgress must be used inside provider'); return v;}
export default function Layout(){
 const [stars,setStars]=useState(0),[gamesPlayed,setGamesPlayed]=useState(0),[completed,setCompleted]=useState<Set<string>>(new Set());
 const value=useMemo(()=>({stars,gamesPlayed,completed,addStars:(n:number)=>setStars(s=>s+n),gameCompleted:(id?:string)=>{setGamesPlayed(n=>n+1);if(id)setCompleted(prev=>new Set(prev).add(id));},resetProgress:()=>{setStars(0);setGamesPlayed(0);setCompleted(new Set());}}),[stars,gamesPlayed,completed]);
 return <C.Provider value={value}><StatusBar style="dark" translucent backgroundColor="transparent"/><Stack screenOptions={{headerShown:false}}/></C.Provider>
}
