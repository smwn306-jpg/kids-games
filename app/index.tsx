import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 32, color: 'white', fontWeight: 'bold' }}>בדיקה!</Text>
    </View>
  );
}
