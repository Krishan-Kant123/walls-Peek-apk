import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { useLocalSearchParams } from "expo-router";
import * as Notifications from "expo-notifications"; 
import { useDispatch, useSelector } from 'react-redux';
import { addImage,removeImage,setImages } from "@/store/imageSlice";

const Screen = () => {
  const { url } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const dispatch = useDispatch();
  

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const cleanUrl = url?.toString().split("?")[0];

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, []);
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please grant notification permissions.');
      }
    };
    requestPermissions();
  }, []);
  

  const toggleFavorite = () => {
    if(!isFavorite){
      dispatch(addImage(url))
      // alert("sent")
    }
    else{
      dispatch(removeImage(url))
    }
    setIsFavorite(!isFavorite);
  };

  // Notification function
  const showNotification = (title: string, message: string) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: message,
      },
      trigger: null,
    });
  };

  const handleDownload = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please grant media library permissions.");
        return;
      }

      setIsDownloading(true);

      const fileUri = FileSystem.documentDirectory + `${cleanUrl.slice(-10)}`;

      const downloadResult = await FileSystem.downloadAsync(cleanUrl, fileUri);

      if (downloadResult.status !== 200) {
        throw new Error("Failed to download image");
      }

      const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);
      await MediaLibrary.createAlbumAsync("Downloaded Images", asset, false);

      // Show success notification
      showNotification("Download Success", "Image saved to gallery!");

    } catch (error) {
      console.error("Error saving image:", error);
      showNotification("Download Error", "Failed to save image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <Animated.View style={[styles.loaderContainer, { opacity: fadeAnim }]}>
          <ActivityIndicator size="large" color="red" />
        </Animated.View>
      )}

      <Image
        source={{ uri: cleanUrl }}
        style={styles.cardImage}
        resizeMode="cover"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />

      <View style={styles.bottomIcons}>
        <View style={styles.bottomiflex}>
          <View style={styles.iconBack}>
            <TouchableOpacity onPress={toggleFavorite} style={{ borderWidth: 1, borderColor: "transparent" }}>
              <Ionicons
                name={isFavorite ? "heart-circle-outline" : "heart-circle-outline"}
                size={30}
                color={isFavorite ? "red" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.iconBack}>
            <TouchableOpacity onPress={handleDownload}>
              <Ionicons name="cloud-download-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.iconBack}>
            <TouchableOpacity>
              <Ionicons name="add-circle-outline" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isDownloading && (
        <View style={styles.downloadOverlay}>
          <ActivityIndicator size="large" color="red" />
          <Text style={styles.downloadingText}>Downloading...</Text>
        </View>
      )}
    </View>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
  loaderContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  bottomIcons: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    zIndex: 2,
  },
  bottomiflex: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    zIndex: 2,
  },
  iconBack: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "#0000002e",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
  },
  downloadOverlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 3,
  },
  downloadingText: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 16,
  },
});
