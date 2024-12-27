import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Image,
  Animated,
  LayoutAnimation,
  UIManager,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DarkThemeSearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [opacityAnim] = useState(new Animated.Value(0)); // Animation for fade-in

  // Function to fetch data
  const fetchData = async (query) => {
    if (!query) return; // Avoid unnecessary calls if query is empty
    console.log(`Fetching data for: ${query}`);
    setLoading(true); // Set loading to true
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const res = await fetch(`https://wallpapers-for-app.onrender.com/search/${query}`);
      const json = await res.json();
      const parsedData = JSON.parse(json); // Parse the JSON data
      setData(parsedData);
      setFilteredData(parsedData);
      startFadeInAnimation(); // Start the fade-in animation
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Fade-in animation for list items
  const startFadeInAnimation = () => {
    opacityAnim.setValue(0); // Reset the opacity to 0
    Animated.timing(opacityAnim, {
      toValue: 1, // Fully visible
      duration: 500, // Animation duration
      useNativeDriver: true,
    }).start();
  };

  const handleInputChange = (text) => {
    setSearchText(text);
    if (text === '') {
      setData([]);
      setFilteredData([]);
    }
  };

  const handleSubmit = () => {
    fetchData(searchText); // Fetch data when search is submitted
    Keyboard.dismiss(); // Hide the keyboard
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>router.push({
      pathname:"/(searched)/[Searched]",
      params:{query:item.title.replace(/<[^>]*>/g, '')}
    })}>
    <Animated.View style={[styles.itemContainer, { opacity: opacityAnim }]}>
     
      {/* Image */}
      <Image
        source={{ uri: item.img }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Text Content: Title and Image Count */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {item.title.replace(/<[^>]*>/g, '')} {/* Clean title */}
        </Text>
        <Text style={styles.imageCount}>{item.img_count}</Text>
      </View>
      
    </Animated.View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.container}>
        <Text style={styles.header}></Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#AAA" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search here..."
            placeholderTextColor="#666"
            selectionColor="red"
            value={searchText}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSubmit}
            clearButtonMode="always"
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
                setData([]); // Clear data
                setFilteredData([]);
              }}
            >
              <Ionicons name="close-circle" size={20} color="#AAA" />
            </TouchableOpacity>
          )}
        </View>

        {/* Activity Indicator */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="red" />
            {/* <Text style={styles.loadingText}>Loading...</Text> */}
          </View>
        ) : (
          /* FlatList */
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.noData}>No items found</Text>
            }
            contentContainerStyle={styles.listContainer}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#FFF',
  },
  icon: {
    marginRight: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 36, // Small image width
    height: 64, // 9:16 ratio
    borderRadius: 5,
    marginRight: 10, // Space between image and text
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  imageCount: {
    color: '#AAA',
    fontSize: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  noData: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginTop: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 16,
  },
});

export default DarkThemeSearchBar;
