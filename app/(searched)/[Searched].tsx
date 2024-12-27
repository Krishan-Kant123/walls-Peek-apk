import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import VerticalCards from '@/components/main/[VerticalCard]'

const Searched = () => {
    const {query}=useLocalSearchParams()
  return (
    <View style={styles.container}>
      <Text style={{color:"white"}}></Text>
      <VerticalCards query={query}/>
    </View>
  )
}

export default Searched;

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#121212",
    width:"100%",
    height:"100%"
  }
})