import { ArtworkScreen } from './artwork';
import { router } from 'expo-router';

export default function Room(){
  return <ArtworkScreen
    source={require('../assets/room-reference.png')}
    sourceW={235} sourceH={454}
    starBox={{x:165,y:32,w:58,h:30}}
    targets={[
      {id:'back',rect:{x:7,y:10,w:42,h:42},path:'/home'},
      {id:'previous',rect:{x:8,y:170,w:45,h:65},action:()=>router.back()},
      {id:'next',rect:{x:180,y:170,w:45,h:65},action:()=>router.back()},
    ]}
  />;
}
