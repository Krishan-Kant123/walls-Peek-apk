import { Image, StyleSheet, Platform, TouchableOpacity,Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView,Text,View,StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Categories from '@/components/main/categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import HorizontalCards from '@/components/main/HorizontalCard';
import VerticalCards from '@/components/main/[VerticalCard]';
import { router } from 'expo-router';
import { useFocusEffect,useNavigation } from '@react-navigation/native';
import { useRef, useEffect } from 'react';
import React from 'react';

const { width } = Dimensions.get('window');
export default function HomeScreen() {
  // const [fontsLoaded] = useFonts({
  //   Pacifico: require('@expo-google-fonts/pacifico'),
  // });
  const navigation = useNavigation();
  const DATA = [
  "cars",
  "car",
  "anime",
  "men",
  "dark",
  "fire",
  "smoke",
  "firewood",
  "sparks",
  "bonfire",
  "black",
  "abstract",
  "liquid",
  "divorces",
  "paint",
  "ball",
  "black",
  "cards",
  "miscellanea",
  "miscellaneous",
  "combination",
  "nature",
  "lake",
  "new zealand",
  "wanaka",
  "island",
  "dark",
  "moon",
  "night",
  "trees",
  "leaves",
  "branches",
  "dark",
  "art",
  "boat",
  "cave",
  "water",
  "dark",
  "texture",
  "textures",
  "surface",
  "letters",
  "background",
  "anime",
  "cities",
  "houses",
  "dark",
  "twilight",
  "sky",
  "wood",
  "tree",
  "branches",
  "dusk",
  "dark",
  "abstract",
  "feather",
  "pen",
  "fractal",
  "shine",
  "brilliance",
  "branch",
  "cars",
  "light",
  "porsche",
  "sports car",
  "supercar",
  "shine",
  "sports",
  "porsche carrera gt",
  "porsche carrera",
  "race",
  "dark",
  "nature",
  "leaves",
  "veins",
  "plant",
  "dark",
  "music",
  "headphones",
  "surface",
  "wooden",
  "wood",
  "dark",
  "fire",
  "smoke",
  "firewood",
  "sparks",
  "bonfire",
  "dark",
  "art",
  "boat",
  "cave",
  "water",
  "black",
  "dark",
  "hood",
  "anonymous",
  "human",
  "person",
  "dark",
  "abstract",
  "feather",
  "pen",
  "fractal",
  "shine",
  "brilliance",
  "branch",
  "dark",
  "twilight",
  "sky",
  "wood",
  "tree",
  "branches",
  "dusk",
  "dark",
  "moon",
  "night",
  "trees",
  "leaves",
  "branches",
  "dark",
  "texture",
  "textures",
  "surface",
  "letters",
  "background",
  "dark",
  "miscellaneous",
  "lamp",
  "red",
  "miscellanea",
  "neon",
  "dark",
  "autumn",
  "shadow",
  "macro",
  "sheet",
  "leaf",
  "dark",
  "fire",
  "bonfire",
  "water",
  "coast",
  "flame",
  "dark",
  "glass",
  "moisture",
  "drops",
  "rain",
  "macro",
  "surface",
  "dark",
  "textures",
  "pebble",
  "texture",
  "gravel",
  "stones",
  "dark",
  "hood",
  "mask",
  "person",
  "anonymous",
  "human",
  "miscellanea",
  "miscellaneous",
  "dark",
  "long exposure",
  "lights",
  "night",
  "road",
  "darkness",
  "dark",
  "art",
  "comet",
  "night",
  "sky",
  "anime",
  "men",
  "anime",
  "cities",
  "houses",
  "anime",
  "girl",
  "rain",
  "kitty",
  "flower",
  "kitten",
  "street",
  "anime",
  "naruto",
  "men",
  "gray",
  "anime",
  "naruto",
  "men",
  "black",
  "anime",
  "girl",
  "sadness",
  "sorrow",
  "rain",
  "umbrella",
  "anime",
  "men",
  "orange",
  "anime",
  "naruto",
  "men",
  "blue",
  "anime",
  "children",
  "anime",
  "naruto",
  "sasuke uchiha",
  "naruto uzumaki",
  "anime",
  "black",
  "men",
  "anime",
  "roads",
  "anime",
  "art",
  "planets",
  "night",
  "sky",
  "blue",
  "anime",
  "death",
  "black",
  "butterflies",
  "anime",
  "dark",
  "naruto",
  "itachi uchiha",
  "raven",
  "anime",
  "naruto",
  "zabuza momochi",
  "anime",
  "piano",
  "grand piano",
  "illusion",
  "universe",
  "silhouette",
  "black",
  "cards",
  "miscellanea",
  "miscellaneous",
  "combination",
  "black",
  "dark",
  "hood",
  "anonymous",
  "human",
  "person",
  "black",
  "cat",
  "blue eyed",
  "opinion",
  "sight",
  "black",
  "lion",
  "grin",
  "art",
  "inscription",
  "grey",
  "black",
  "cinema",
  "people",
  "star wars",
  "black",
  "abstract",
  "liquid",
  "divorces",
  "paint",
  "ball",
  "black",
  "logos",
  "background",
  "black",
  "minimalism",
  "words",
  "loading",
  "future",
  "text",
  "black",
  "background",
  "black",
  "abstract",
  "point",
  "stripes",
  "red",
  "white",
  "circles",
  "lines",
  "stains",
  "spots",
  "streaks",
  "points",
  "strokes",
  "black",
  "ship",
  "bw",
  "sea",
  "sail",
  "buya",
  "chb",
  "sails",
  "buoy",
  "black",
  "lightning",
  "glow",
  "black",
  "dark",
  "guitar",
  "music",
  "acoustic guitar",
  "musical instrument",
  "black",
  "machine",
  "speedometer",
  "cars",
  "salon",
  "car",
  "control panel",
  "black",
  "headlight",
  "dark",
  "cars",
  "shine",
  "light",
  "car",
  "black",
  "men",
  "people",
  "background",
  "black",
  "background",
  "nature",
  "horizon",
  "boat",
  "water",
  "mountains",
  "lake",
  "nature",
  "lake",
  "new zealand",
  "wanaka",
  "island",
  "nature",
  "landscape",
  "lakes",
  "nature",
  "vertex",
  "trees",
  "sinuous",
  "road",
  "mountain",
  "top",
  "winding",
  "nature",
  "sakura",
  "rivers",
  "flow",
  "bridge",
  "nature",
  "road",
  "sunset",
  "sky",
  "markup",
  "bend",
  "nature",
  "landscape",
  "green",
  "mountains",
  "grass",
  "trees",
  "valley",
  "nature",
  "landscape",
  "sea",
  "beach",
  "nature",
  "sea",
  "sunset",
  "pier",
  "horizon",
  "beams",
  "rays",
  "nature",
  "mountains",
  "sky",
  "palms",
  "sunlight",
  "nature",
  "grass",
  "lawn",
  "summer",
  "handsomely",
  "it's beautiful",
  "nature",
  "plants",
  "red",
  "landscape",
  "nature",
  "view from above",
  "beach",
  "sea",
  "sand",
  "nature",
  "mountains",
  "trees",
  "mount rainier",
  "usa",
  "grass",
  "slope",
  "flowers",
  "snow",
  "united states",
  "nature",
  "road",
  "turn",
  "markup",
  "nature",
  "asphalt",
  "palms",
  "mountains",
  "road",
  "nature",
  "trees",
  "forest",
  "waterfall",
  "streams",
  "flows",
  "mountain river",
  "flora",
  "fauna",
  "minimalism",
  "nature",
  "sky",
  "branches",
  "minimalism",
  "miscellanea",
  "white",
  "leaves",
  "miscellaneous",
  "branch",
  "bottle",
  "minimalism",
  "yellow",
  "aesthetics",
  "fog",
  "wood",
  "tree",
  "minimalism",
  "sky",
  "gradient",
  "birds",
  "silhouettes",
  "flight",
  "minimalism",
  "flowers",
  "yellow",
  "flower",
  "tulip",
  "minimalism",
  "motley",
  "multicolored",
  "windows",
  "building",
  "facade",
  "minimalism",
  "texture",
  "textures",
  "blue",
  "white",
  "red",
  "line",
  "minimalism",
  "tranquillity",
  "view from above",
  "boat",
  "lake",
  "fog",
  "calmness",
  "minimalism",
  "sakura",
  "aesthetics",
  "flowers",
  "branches",
  "minimalism",
  "wolf",
  "cave",
  "artistic",
  "minimalism",
  "yellow",
  "branch",
  "vase",
  "minimalism",
  "stripes",
  "texture",
  "textures",
  "vertical",
  "streaks",
  "lines",
  "minimalism",
  "headphones",
  "pastel",
  "pink",
  "minimalism",
  "bicycle",
  "orange",
  "lobules",
  "slices",
  "wheels",
  "minimalism",
  "texture",
  "textures",
  "abstract",
  "paint",
  "wave",
  "smears",
  "strokes",
  "minimalism",
  "textures",
  "texture",
  "multicolored",
  "wavy",
  "motley",
  "stains",
  "spots",
  "minimalism",
  "minimalist",
  "mountain",
  "black & white",
  "artistic",
  "cars",
  "car",
  "front view",
  "mercedes",
  "forest",
  "white",
  "cars",
  "audi",
  "asphalt",
  "autumn",
  "audi tt",
  "movement",
  "road",
  "traffic",
  "cars",
  "sports car",
  "supercar",
  "nissan gt r",
  "rain",
  "backlight",
  "nissan",
  "illumination",
  "asphalt",
  "sports",
  "night",
  "wet",
  "cars",
  "rolls royce",
  "front view",
  "headlights",
  "bumper",
  "lights",
  "cars",
  "ferrari",
  "back view",
  "autumn",
  "red",
  "rear view",
  "racing",
  "scuderia",
  "cars",
  "car",
  "muscle car",
  "dodge challenger srt",
  "sports car",
  "dodge",
  "maslkar",
  "black",
  "sports",
  "cars",
  "light",
  "porsche",
  "sports car",
  "supercar",
  "shine",
  "sports",
  "porsche carrera gt",
  "porsche carrera",
  "race",
  "cars",
  "lamborghini",
  "sports car",
  "art",
  "lamborghini murcielago",
  "sports",
  "cars",
  "street",
  "usa",
  "los angeles",
  "view from above",
  "cities",
  "city",
  "building",
  "road",
  "united states",
  "cars",
  "sports car",
  "front view",
  "headlights",
  "sports",
  "dodge",
  "dodge srt",
  "lights",
  "red",
  "cars",
  "ferrari",
  "race",
  "back view",
  "sports car",
  "ferrari f12",
  "rear view",
  "sports",
  "cars",
  "lamborghini",
  "sports car",
  "car",
  "road",
  "sports",
  "blue",
  "track",
  "route",
  "lamborghini huracan",
  "porsche",
  "cars",
  "black",
  "car",
  "salon",
  "steering wheel",
  "red",
  "rudder",
  "cars",
  "front view",
  "headlight",
  "black",
  "car",
  "machine",
  "backlight",
  "illumination",
  "lights",
  "cars",
  "car",
  "illumination",
  "backlight",
  "black",
  "machine",
  "red",
  "lanterns",
  "cars",
  "ferrari",
  "close",
  "wheel",
  "car",
  "near",
  "bmw",
  "cars",
  "headlights",
  "lights",
  "front view",
  "white",
  "3d",
  "butterfly",
  "leaves",
  "contrast",
  "wings",
  "3d",
  "art",
  "clouds",
  "sky",
  "house",
  "3d",
  "blur",
  "wood",
  "miniature",
  "lamp",
  "tree",
  "smooth",
  "3d",
  "multicolored",
  "balls",
  "3d",
  "black",
  "dark",
  "skull",
  "crown",
  "3d",
  "sphere",
  "molecules",
  "galaxy",
  "3d",
  "cherry",
  "berry",
  "3d",
  "smilies",
  "emoticons",
  "smiles",
  "smileys",
  "balloons",
  "taw",
  "emotions",
  "3d",
  "dragon",
  "monster",
  "sad",
  "nice",
  "sweetheart",
  "3d",
  "trees",
  "painting",
  "realism",
  "landscape",
  "stones",
  "rock",
  "fog",
  "roots",
  "3d",
  "neon",
  "fluorescence",
  "person",
  "human",
  "clipart",
  "stains",
  "paint",
  "spots",
  "luminescence",
  "3d",
  "flower",
  "lotus",
  "green",
  "water lily",
  "3d",
  "light",
  "glass",
  "balls",
  "neon",
  "shine",
  "3d",
  "ball",
  "space explosion",
  "cosmic explosion",
  "bright",
  "flight",
  "3d",
  "ball",
  "flight",
  "plant",
  "3d",
  "computer",
  "chip",
  "macro",
  "scheme",
  "detail",
  "metal",
  "3d",
  "electricity",
  "rosette",
  "lamp",
  "socket",
  "idea",
  "art",
  "bicycle",
  "rivers",
  "clouds",
  "small house",
  "evening",
  "lodge",
  "art",
  "fantasy",
  "magic",
  "butterflies",
  "forest",
  "art",
  "alone",
  "loneliness",
  "sadness",
  "human",
  "sorrow",
  "lonely",
  "person",
  "art",
  "trees",
  "fog",
  "stones",
  "lake",
  "art",
  "dark",
  "night",
  "landscape",
  "art",
  "trees",
  "illusion",
  "forest",
  "moon",
  "art",
  "night",
  "wires",
  "pillars",
  "posts",
  "wire",
  "art",
  "sailboat",
  "rocks",
  "break",
  "precipice",
  "sailfish",
  "storm",
  "art",
  "plane",
  "clouds",
  "airplane",
  "flight",
  "sky",
  "art",
  "night city",
  "overview",
  "review",
  "bench",
  "art",
  "house",
  "road",
  "lock",
  "branch",
  "art",
  "night",
  "antenna",
  "antennas",
  "building",
  "starry sky",
  "art",
  "love",
  "kiss",
  "rain",
  "3d",
  "art",
  "clouds",
  "sky",
  "house",
  "art",
  "romance",
  "love",
  "sunset",
  "machine",
  "car",
  "art",
  "ship",
  "bats",
  "waterfall",
  "art",
  "car",
  "field",
  "robot",
  "van",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "silco (league of legends)",
  "jinx (league of legends)",
  "tv show",
  "jayce (league of legends)",
  "mel medarda",
  "vi (league of legends)",
  "arcane",
  "jinx (league of legends)",
  "silco (league of legends)",
  "tv show",
  "vi (league of legends)",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "tv show",
  "arcane",
  "tv show",
  "jinx (league of legends)",
  "arcane",
  "tv show",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "tv show",
  "jinx (league of legends)",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "vi (league of legends)",
  "jinx (league of legends)",
  "tv show",
  "arcane",
  "tv show",
  "jinx (league of legends)",
  "mel medarda",
  "silco (league of legends)",
  "vi (league of legends)",
  "arcane",
  "jinx (league of legends)",
  "tv show",
  "abstract",
  "flower",
  "shine",
  "brilliance",
  "fractal",
  "glare",
  "abstract",
  "dark",
  "golden",
  "fractal",
  "blue",
  "brilliance",
  "shine",
  "structure",
  "abstract",
  "flowers",
  "shadow",
  "light",
  "it's beautiful",
  "shine",
  "handsomely",
  "abstract",
  "background",
  "blue",
  "abstract",
  "contrast",
  "multicolored",
  "form",
  "details",
  "patterns",
  "motley",
  "black",
  "abstract",
  "liquid",
  "divorces",
  "paint",
  "ball",
  "abstract",
  "fire",
  "water",
  "candles",
  "blue",
  "abstract",
  "colorful",
  "flower",
  "background",
  "multicolored",
  "dymovoy",
  "smoke",
  "motley",
  "colourful",
  "abstract",
  "brilliance",
  "convex",
  "form",
  "forms",
  "shine",
  "fractal",
  "balls",
  "abstract",
  "space",
  "fractal",
  "spheres",
  "balls",
  "sphere",
  "abstract",
  "blur",
  "lamp",
  "smooth",
  "silhouette",
  "paint",
  "lantern",
  "abstract",
  "glare",
  "flower",
  "fractal",
  "glow",
  "abstract",
  "black",
  "background",
  "rainbow",
  "abstract",
  "lines",
  "blue",
  "stripes",
  "streaks",
  "distortion",
  "abstract",
  "bright",
  "fractal",
  "digital",
  "purple",
  "flower",
  "violet",
  "abstract",
  "motley",
  "canvas",
  "art",
  "multicolored",
  "paint",
  "abstract",
  "energy",
  "confused",
  "intricate",
  "fractal",
  "glow"
   ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reset your page state here if needed
    });

    return unsubscribe; // Cleanup on unmount
  }, [navigation]);

  const scrollRef = useRef<ScrollView>(null);
  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top whenever the screen gains focus
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ y: 0, animated: true });
      }
    }, [])
  );

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <StatusBar
        translucent={true} // Status bar overlaps content
        backgroundColor="transparent" // Fully transparent
        barStyle="light-content" // Light icons and text
      />
    <ScrollView >
      <View style={styles.cont}>
        <TouchableOpacity onPress={()=> router.push({pathname:"/(tabs)/accountinfo"})}>

<Ionicons name="menu-sharp" size={28} color={"white"}/>
        </TouchableOpacity>
<View style={styles.txtcont}>
      <Text style={styles.txt} >Walls-</Text>
      <Text style={[styles.txt,{color:"red"}]}>Peek</Text>
</View>
      <TouchableOpacity style={styles.search} onPress={()=> router.push({pathname:"/(tabs)/ch"})}>

        <Ionicons name="search-outline" size={28} color={"white"}/>
      </TouchableOpacity>
      </View>
     <Categories/>
     <HorizontalCards/>
     <VerticalCards query={DATA[Math.floor(Math.random() * DATA.length)]}/>
    </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
height:"100%",
width:"100%",
backgroundColor:"#0a0a0a"
  },
  cont:{
    // top:40,
    height:100,
    width:width,
    backgroundColor:"#121212",
    // backgroundColor:"red",
    flex:1,
    flexDirection:"row",
    alignItems:"flex-end",
    padding:10,
    gap:5,
    // borderWidth:1,
    // borderColor:"red"
    // justifyContent:"center"
    
   

  },
  txtcont:{
 color:"#999",
 fontSize:24,
 flex:1,
 flexDirection:"row",
//  alignItems:"flex-start",
//  justifyContent:"start",
//  borderWidth:1,
//  borderColor:"red"
//  fontWeight:"bold"
  },
  txt:{
    color:"#fff",
 fontSize:24,
 fontWeight:"bold"
  },
  search:{
    // position:"absolute",
  //  right:"3%",
  //  borderColor:"red",
  //  borderWidth:2
    // left:"92%",
    // bottom:10

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
