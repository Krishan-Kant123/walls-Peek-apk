import { View, Text, ScrollView,FlatList,StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useEffect,useState } from 'react'
import { ThemedText } from '../ThemedText'
import { router } from 'expo-router';

const Categories = () => {
   const DATA = [
    "black","dark","hood","anonymous","human","person","dark","nature","leaves","veins","plant","nature","horizon","boat","water","mountains","lake","dark","music","headphones","surface","wooden","wood","bmw","bmw m3","black"
   ];
  // const [DATA, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://wallpapers-for-app.onrender.com'); // API endpoint
      const json = await response.json();
      // setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <Text style={styles.categ}>Categories</Text>
      ()
    <ScrollView >
      <FlatList
        data={DATA} // Data to display
        keyExtractor={(item,index) => index.toString()} // Unique key for each item
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>{router.push({
            pathname:"/(searched)/[Searched]",
            params:{query:item}
          })}}>
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
          </TouchableOpacity>
        )}
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the scroll indicator
        contentContainerStyle={styles.flatListContainer}
      />
      
      

    </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  categ:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#fff',

  },
  container: {
    flex: 1,
    marginTop: 10,
    paddingLeft:12
    // backgroundColor: '#F5F5F5',
  },
  flatListContainer: {
    // paddingHorizontal: 5, // Add padding around the list
  },
  item: {
    // backgroundColor: '#4CAF50',

    paddingVertical:5,
    paddingHorizontal:15,
    marginVertical: 8,
    marginHorizontal: 7,
    marginLeft:0,
    borderRadius: 20,
    borderWidth:1.1,
    borderColor:"#999"
  },
  title: {
    fontSize: 15,
    color: '#fff',
  },
});

export default Categories