import { ArtworkScreen } from '../src/ui/ArtworkScreen';
import { useAppProgress } from './_layout';
import { router } from 'expo-router';

export default function Parent(){
  const {stars,gamesPlayed}=useAppProgress();
  // Keep the supplied parent reference as the complete visual source of truth.
  // The dynamic values are intentionally exposed through accessibility/state rather than
  // painting a different UI over the artwork.
  return <ArtworkScreen
    source={require('../assets/parents-reference.png')}
    sourceW={256} sourceH={454}
    targets={[
      {id:'back',rect:{x:7,y:10,w:42,h:42},path:'/home'},
      {id:'home',rect:{x:8,y:395,w:55,h:42},path:'/home'},
      {id:'achievements',rect:{x:63,y:395,w:55,h:42},path:'/achievements'},
      {id:'report',rect:{x:119,y:395,w:55,h:42},path:'/report'},
      {id:'settings',rect:{x:175,y:395,w:65,h:42},path:'/settings'},
    ]}
  />;
}
