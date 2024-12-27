import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated'; // You can use for animations if needed
import * as Animatable from 'react-native-animatable'; 
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

const HorizontalCards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage]=useState(1)
  const [isFetchingNext, setIsFetchingNext] = useState(false);


  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://wallpapers-for-app.onrender.com/popular/${page}`
      ); // API for image data
      const json = await response.json();
      setData(prevData => [...prevData, ...json]);
      setPage(page+1) // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  const fetchNext = async () => {
    if (isFetchingNext || loading) return; // Avoid multiple triggers
    setIsFetchingNext(true);
    // Increment page
    fetchImages();
  };

  const colorMode = 'dark'
  const renderLoadingSkeleton = () => {
    const skeletons = Array(5).fill(null); // Placeholder skeleton cards
    return (
      <FlatList
        data={skeletons}
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => (
          <MotiView
          transition={{
            type: 'timing',
          }}
          style={styles.card}
          animate={{ backgroundColor:'#000000' }}
        >
          <Skeleton colorMode={colorMode} width={cardWidth} height={cardHeight}/>
        
          
        </MotiView>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular's</Text>
      {loading ? (
        renderLoadingSkeleton() // Show skeleton cards while loading
      ) : (
        <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()} // Use index as the key
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={()=> router.push({pathname:"/(wallscreen)/[Screen]",
          params:{url:item}})}>
            <Image
              source={{ uri: item }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        onEndReached={fetchNext} // Trigger fetchNext when scrolled to the end
        onEndReachedThreshold={0.5} // Trigger fetchNext when 50% away from the end
        ListFooterComponent={
          isFetchingNext ? (
            <MotiView
            transition={{
              type: 'timing',
            }}
            style={styles.card}
            animate={{ backgroundColor:'#000000' }}
          >
            <Skeleton colorMode={colorMode} width={cardWidth} height={cardHeight}/>
          
            
          </MotiView>
          ) : null
        }
      />
    )}
      />
      )}
    </View>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.4; // 40% of screen width
const cardHeight = cardWidth * 16 / 9; // 9:16 aspect ratio

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    // backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  flatListContainer: {
    // paddingHorizontal: 5,
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardImage: {
    width: '100%',
    height: '100%', // Take up 80% of card height
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 5,
  },
  skeletonCard: {
    backgroundColor: '#E0E0E0',
  },
});

export default HorizontalCards;
