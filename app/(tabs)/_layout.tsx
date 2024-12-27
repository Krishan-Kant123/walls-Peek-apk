import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "red",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Ensure the tab bar floats for iOS
            backgroundColor: '#121212', // Set background color
            borderTopWidth: 0, // Remove top border for better appearance
          },
          default: {
            backgroundColor: '#121212', // Set background color for Android
            borderTopWidth: 0, // Remove top border for better appearance
          },
        }),
        tabBarHideOnKeyboard: true, // Automatically hide the tab bar when the keyboard is open
      }}
    >
      <StatusBar
        translucent={true} // Makes the status bar translucent
        backgroundColor="transparent" // Transparent background
        barStyle="light-content" // Text/icons in the status bar appear light
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'For You',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ch"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Favourite`s',
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="accountinfo"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <Ionicons name="person-circle-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
