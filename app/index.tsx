import { Image, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAppProgress } from './_layout';

export default function Startup(){
  const {profilesReady, profiles} = useAppProgress();
  useEffect(()=>{
    if(!profilesReady) return;
    if(profiles.length===0) router.replace('/welcome');
    else router.replace('/profiles');
  },[profilesReady, profiles.length]);
  return <View style={styles.root}><Image source={require('../assets/home-reference.png')} resizeMode="stretch" style={StyleSheet.absoluteFillObject}/></View>;
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:'#dff5ff'}});
