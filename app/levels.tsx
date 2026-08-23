import { useAppProgress } from './_layout';
import { ArtworkScreen } from '../src/ui/ArtworkScreen';
import { router } from 'expo-router';

const W=441,H=570;
export default function Levels(){
  const {completedLevels,stars}=useAppProgress();
  const completedAnimals=(completedLevels.animals??[]).length;
  const unlocked=Math.min(12,1+completedAnimals);
  const levels=Array.from({length:12},(_,i)=>i+1);
  const targets=[
    {id:'back',rect:{x:8,y:10,w:55,h:55},path:'/adventure'},
    ...levels.map((n,i)=>({id:`level-${n}`,rect:{x:38+(i%4)*90,y:190+Math.floor(i/4)*96,w:90,h:86},action:()=>{if(n<=unlocked)router.push(`/game/animals?level=${n}` as any)}})),
    {id:'play',rect:{x:140,y:475,w:170,h:78},action:()=>router.push('/game/animals?level=1' as any)},
  ];
  return <ArtworkScreen source={require('../assets/levels-reference-clean-ui.png')} sourceW={W} sourceH={H} starBox={{x:344,y:32,w:73,h:31}} targets={targets}/>;
}
