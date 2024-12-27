import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to load image URLs from AsyncStorage
const loadImagesFromStorage = async () => {
  const storedImages = await AsyncStorage.getItem('imageUrls');
  return storedImages ? JSON.parse(storedImages) : [];
};

export const imageSlice = createSlice({
  name: 'images',
  initialState: {
    urls: [],
  },
  reducers: {
    setImages: (state, action) => {
      state.urls = action.payload;
    },
    addImage: (state, action) => {
      if (!state.urls.includes(action.payload)) { // Prevent duplication
        const newUrls = [...state.urls, action.payload];
        state.urls = newUrls;
        // Persist to AsyncStorage
        AsyncStorage.setItem('imageUrls', JSON.stringify(newUrls));
      }
    },
    removeImage: (state, action) => {
      const newUrls = state.urls.filter(url => url !== action.payload);
      state.urls = newUrls;
      // Persist to AsyncStorage
      AsyncStorage.setItem('imageUrls', JSON.stringify(newUrls));
    },
  },
});

// Load images from AsyncStorage when the app starts
export const loadImages = () => async (dispatch) => {
  const images = await loadImagesFromStorage();
  dispatch(setImages(images));
};

export const { setImages, addImage, removeImage } = imageSlice.actions;

export default imageSlice.reducer;
