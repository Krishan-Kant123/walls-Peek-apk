import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRef, useEffect } from 'react';

export default function AccountInfo() {
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
    <ScrollView contentContainerStyle={styles.container} ref={scrollRef}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s'}} style={styles.profilePic} />
        <Text style={styles.username}>Alok</Text>
        <Text style={styles.email}>alok@example.com</Text>
      </View>

      {/* Account Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="edit" size={24} color="white" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="lock" size={24} color="white" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="notifications" size={24} color="white" />
          <Text style={styles.optionText}>Notification Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="language" size={24} color="white" />
          <Text style={styles.optionText}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="dark-mode" size={24} color="white" />
          <Text style={styles.optionText}>Theme</Text>
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="help-outline" size={24} color="white" />
          <Text style={styles.optionText}>Help & Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <MaterialIcons name="info" size={24} color="white" />
          <Text style={styles.optionText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Section */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212', // Dark background
    padding: 20,
    paddingTop:50
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#444', // Lighter border for dark theme
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff', // White text for contrast
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#bbb', // Lighter text for email
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // White text for titles
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#333', // Dark background for options
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff', // White text for options
  },
  logoutContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: '#ff4757', // Red button for log out
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
