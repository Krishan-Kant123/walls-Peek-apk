import React, { useEffect, useState,memo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable'; 
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

const VerticalCards = memo(({query="nature"}) => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,setPage]=useState(1)
  const [isFetchingNext, setIsFetchingNext] = useState(false);


  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // setLoading(true);
      const response = await fetch(
        `https://wallpapers-for-app.onrender.com/category/${page}/${query}`
      ); // Replace with your image URL array if necessary
      const json = await response.json();
      setData(prevData => [...prevData, ...json]);
      console.log(json) 
      setPage(page+1)// Update state with fetched data
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
    const skeletons = Array(8).fill(null); // Placeholder skeleton cards
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
        <Spacer />
        
      </MotiView>
        )}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
       
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{query.charAt(0).toUpperCase() + query.slice(1)}</Text>
      {loading ? (
        renderLoadingSkeleton() // Show skeleton cards while loading
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item }) => (
            <Animatable.View
             
              style={styles.card}
            >
              <TouchableOpacity onPress={()=> router.push({pathname:"/(wallscreen)/[Screen]",
          params:{url:item}})}>
                <Image
                  source={{ uri: item}} // Display fetched images
                  resizeMode="cover"
                  style={styles.cardImage}
                  
                />
                
              </TouchableOpacity>
            </Animatable.View>
          )}
          numColumns={2} // Display two columns
          contentContainerStyle={styles.flatListContainer}
          onEndReached={fetchNext} // Trigger fetchNext when scrolled to the end
          onEndReachedThreshold={0.5} // Trigger fetchNext when 50% away from the end
          ListFooterComponent={
            isFetchingNext ? (
              renderLoadingSkeleton
            ) : null
          }
        />
      )}
    </View>
  );
});

const { width } = Dimensions.get('window');
const cardWidth = (width / 2) - 15; // Half of screen width minus padding
const cardHeight = cardWidth * 16 / 9; // 9:16 aspect ratio
const Spacer = ({ height = 16 }) => <View style={{ height }} />;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    // borderWidth:1,
    // borderColor:"red",
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
    margin: 5,
    marginLeft:0, // Margin between cards
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
    borderRadius: 10,
    margin: 5, // Skeleton card spacing
  },
  padded: {
    padding: 16,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default VerticalCards;
