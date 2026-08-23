import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions, Animated, Easing } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { speakHebrew } from './voice';

const W = 321, H = 500;

export default function Welcome(){
  const {width,height}=useWindowDimensions();
  const sx=width/W, sy=height/H;

  const intro = useRef(new Animated.Value(0)).current;
  const lionBob = useRef(new Animated.Value(0)).current;
  const lionTilt = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(0)).current;
  const sparkle = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    speakHebrew('ברוכים הבאים לעולם המשחקים!');

    Animated.sequence([
      Animated.timing(intro,{toValue:1,duration:650,easing:Easing.out(Easing.back(1.15)),useNativeDriver:true}),
      Animated.delay(120),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(lionBob,{toValue:-1,duration:900,easing:Easing.inOut(Easing.quad),useNativeDriver:true}),
        Animated.timing(lionBob,{toValue:0,duration:900,easing:Easing.inOut(Easing.quad),useNativeDriver:true}),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(lionTilt,{toValue:1,duration:850,easing:Easing.inOut(Easing.sin),useNativeDriver:true}),
        Animated.timing(lionTilt,{toValue:-1,duration:1000,easing:Easing.inOut(Easing.sin),useNativeDriver:true}),
        Animated.timing(lionTilt,{toValue:0,duration:850,easing:Easing.inOut(Easing.sin),useNativeDriver:true}),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse,{toValue:1,duration:700,easing:Easing.inOut(Easing.quad),useNativeDriver:true}),
        Animated.timing(buttonPulse,{toValue:0,duration:700,easing:Easing.inOut(Easing.quad),useNativeDriver:true}),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkle,{toValue:1,duration:950,easing:Easing.inOut(Easing.sin),useNativeDriver:true}),
        Animated.timing(sparkle,{toValue:0,duration:950,easing:Easing.inOut(Easing.sin),useNativeDriver:true}),
      ])
    ).start();
  },[]);

  const introScale=intro.interpolate({inputRange:[0,1],outputRange:[0.92,1]});
  const introY=intro.interpolate({inputRange:[0,1],outputRange:[22,0]});
  const bobY=lionBob.interpolate({inputRange:[-1,0],outputRange:[-7,0]});
  const tilt=lionTilt.interpolate({inputRange:[-1,0,1],outputRange:['-1.8deg','0deg','1.8deg']});
  const buttonScale=buttonPulse.interpolate({inputRange:[0,1],outputRange:[1,1.035]});
  const sparkleOpacity=sparkle.interpolate({inputRange:[0,1],outputRange:[0.35,1]});
  const sparkleScale=sparkle.interpolate({inputRange:[0,1],outputRange:[0.8,1.15]});

  return <View style={s.root}>
    <Animated.View style={[StyleSheet.absoluteFillObject,{opacity:intro,transform:[{translateY:Animated.add(introY,bobY)},{scale:introScale},{rotate:tilt}]}]}>
      <Image source={require('../assets/welcome-animated.gif')} style={StyleSheet.absoluteFillObject} resizeMode="stretch" />
    </Animated.View>

    {/* Gentle foreground sparkle accents reinforce the magical opening without changing the reference artwork. */}
    <Animated.View pointerEvents="none" style={[s.sparkle,{left:42*sx,top:160*sy,opacity:sparkleOpacity,transform:[{scale:sparkleScale}]}]}><Text style={s.sparkleText}>✦</Text></Animated.View>
    <Animated.View pointerEvents="none" style={[s.sparkle,{left:270*sx,top:145*sy,opacity:sparkleOpacity,transform:[{scale:sparkleScale}]}]}><Text style={s.sparkleText}>✦</Text></Animated.View>

    <Animated.View style={[s.buttonMotion,{left:79*sx,top:425*sy,width:166*sx,height:52*sy,transform:[{scale:buttonScale}]}]}>
      <Pressable accessibilityLabel="הבא" style={StyleSheet.absoluteFillObject} onPress={()=>router.push('/create-profile')}>
        <Text style={s.hiddenText}>הבא</Text>
      </Pressable>
    </Animated.View>
  </View>
}

const s=StyleSheet.create({
  root:{flex:1,backgroundColor:'#17266c',overflow:'hidden'},
  buttonMotion:{position:'absolute'},
  hiddenText:{opacity:0},
  sparkle:{position:'absolute',width:24,height:24,alignItems:'center',justifyContent:'center'},
  sparkleText:{color:'#fff',fontSize:20,textShadowColor:'#fff',textShadowRadius:8},
});
