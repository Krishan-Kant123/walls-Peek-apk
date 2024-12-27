import { Image, StyleSheet, Platform,View,ScrollView  } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBarExample from '@/components/main/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <View  style={styles.container}>
      <SearchBarExample/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#121212",
    width:"100%",
    height:"100%"
  }
});
