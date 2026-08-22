import { ArtworkScreen } from '../src/ui/ArtworkScreen';
export default function Achievements(){
  return <ArtworkScreen
    source={require('../assets/achievements-reference.png')}
    sourceW={260} sourceH={454}
    starBox={{x:193,y:32,w:54,h:30}}
    targets={[
      {id:'back',rect:{x:8,y:10,w:42,h:42},path:'/home'},
      {id:'general',rect:{x:25,y:58,w:72,h:34},path:'/achievements'},
      {id:'games',rect:{x:97,y:58,w:72,h:34},path:'/achievements'},
      {id:'special',rect:{x:169,y:58,w:68,h:34},path:'/achievements'},
    ]}
  />;
}
