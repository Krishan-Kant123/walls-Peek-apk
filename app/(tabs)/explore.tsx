import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { UseDispatch } from 'react-redux'; 
import { removeImage } from '@/store/imageSlice';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import { useRef, useEffect } from 'react';
import { store } from '../../store/store'
import { loadImages } from '@/store/imageSlice';

const Explore = () => {
  const imageUrls = useSelector((state: RootState) => state.images?.urls || []);
  const dispatch=useDispatch()
  const scrollRef = useRef<FlatList>(null);
  const flatListRef = useRef<FlatList>(null);
   useEffect(() => {
    store.dispatch(loadImages()); // Load images from AsyncStorage when the app starts
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to the top whenever the screen is focused
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      }
    }, [])
  );
  

  const toggleLike = (url: string) => {
    dispatch(removeImage(url))
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourites</Text>
      <FlatList
      ref={flatListRef}
        data={imageUrls}
        keyExtractor={(item, index) => index.toString()} // Ensure unique keys
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/(wallscreen)/[Screen]',
                  params: { url: item },
                })
              }
            >
              <Image
                source={{ uri: item }} // Display fetched images
                resizeMode="cover"
                style={styles.cardImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heartIconContainer}
              onPress={() => toggleLike(item)}
            >
              <Ionicons
                name={ 'heart-circle-outline' }
                size={24}
                color="red"
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noData}>No items found</Text>}
        numColumns={2} // To display items in a grid (optional)
        contentContainerStyle={{ padding: 10 }} // Add padding to FlatList
      />
    </View>
  );
};

export default Explore;

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 20; // Half of screen width minus padding
const cardHeight = (cardWidth * 16) / 9; // 9:16 aspect ratio

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
    paddingHorizontal: 0,
    paddingTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#999',
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 10,
    margin: 3, // Margin between cards
    backgroundColor: '#FFF',
    overflow: 'hidden',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    position: 'relative', // Needed for absolute positioning
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderRadius: "50%",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    padding: 5,
  },
  noData: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 15,
  },
});
