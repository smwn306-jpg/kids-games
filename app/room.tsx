import { useState } from 'react';
import { Image, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { ArtworkScreen } from '../src/ui/ArtworkScreen';

const characters=[
  require('../assets/avatar-lion.png'), require('../assets/avatar-elephant.png'), require('../assets/avatar-rabbit.png'),
  require('../assets/avatar-giraffe.png'), require('../assets/avatar-panda.png')
];

export default function Room(){
  const [index,setIndex]=useState(0);
  return <View style={{flex:1}}>
    <ArtworkScreen source={require('../assets/room-reference-clean-ui.png')} sourceW={235} sourceH={454} starBox={{x:165,y:32,w:58,h:30}} targets={[
      {id:'back',rect:{x:7,y:10,w:42,h:42},path:'/home'},
      {id:'previous',rect:{x:8,y:170,w:45,h:65},action:()=>setIndex(i=>(i+characters.length-1)%characters.length)},
      {id:'next',rect:{x:180,y:170,w:45,h:65},action:()=>setIndex(i=>(i+1)%characters.length)},
    ]} overlays={({scale,offsetX,offsetY})=><Image source={characters[index]} resizeMode="contain" style={{position:'absolute',left:offsetX+62*scale,top:offsetY+92*scale,width:112*scale,height:145*scale}}/>}/>
  </View>
}
