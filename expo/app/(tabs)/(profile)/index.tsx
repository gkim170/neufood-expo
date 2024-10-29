import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import Images from '@/constants/images'; 

const ProfilePage = () => {

  const navigation = useNavigation();

  // set the default value of profile data
  const [user, setUser] = useState({
    firstname: 'User',
    lastname: '',
    email: 'neufood@example.com',
    passwd: '',
    selectedImage: Images.profpic,
  });

  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Profile page rendered');
  }, []);

  // function to navigate to edit profile
  const handleEdit = () => {
    console.log('Navigating to edit profile...'); 
    
    // Navigate to edit profile
    navigation.navigate('editprofile', { 
      user,
      updateUser: (updatedUser) => setUser(updatedUser),
     });


    // Check if result is available to update profileData
    // if (result) {
    //   setProfileData(result);
    // }
  }

  // function to navigate to notifications
  const handleNotification = () => {
    console.log('Navigating to notification...'); 
    router.push("./notifications");
  }

  // function to navigate to preferences
  const handlePreferences = () => {
    console.log('Navigating to preferences...'); 
    router.push("./preferences");
  }

  // function to navigate to allergies
  const handleAllergies = () => {
    console.log('Navigating to allergies...'); 
    router.push("./allergies");
  }

  // function to navigate to badges
  const handleBadges = () => {
    console.log('Navigating to badges...'); 
    router.push("./badges");
  }

  // function to navigate to friends
  const handleFriends = () => {
    console.log('Navigating to friends...'); 
    router.push("./friends");
  }

  // functino to log out
  const handlelogout = () => {
    console.log('Logging out ...');
    alert('Logging out');
  }

  

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">

      {/* container of the body of the page */}
      <View style={styles.body}>
          <View style={styles.userinfo}>
            {/* profile picture, username and email */}
            <Image source={user.selectedImage == Images.profpic ? user.selectedImage : { uri: user.selectedImage } } style={styles.profilepic}/>
            <Text style={styles.username}>{user.firstname + " " + user.lastname}</Text>
            <Text style={styles.useremail}>{user.email}</Text>
          </View>
          {/* menu of functions to navigate */}
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.menubutton}
              onPress={handleEdit}>
                <Text>Edit Profile</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menubutton}
              onPress={handleNotification}>
                <Text>Notifications</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menubutton}
              onPress={handlePreferences}>
                <Text>Preferences</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menubutton}
              onPress={handleAllergies}>
                <Text>Allergies</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menubutton}
              onPress={handleBadges}>
                <Text>Badges</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menubutton}
              onPress={handleFriends}>
                <Text>Friends</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menubutton}
              onPress={handlelogout}>
                <Text>Log Out</Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          


        </View>
    </View>
  );
};

export default ProfilePage;

// styling the components
const styles = StyleSheet.create({
  body: {
      flex: 5,
      width: '100%',
      backgroundColor: '#fbf3d9',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
  },
  image: {
    flex: 1,
    width: 80,
    height: 80,
  },
  title: {
    flex: 1,
    color: '#0a0a0a',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userinfo: {
    flex: 2,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    flex: 3,
  },
  profilepic: {
    flex: 3,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    flex: 1,
    color: '#0a0a0a',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  useremail: {
    flex: 1,
    color: '#0a0a0a',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menubutton: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 5,
    height: 40,
  },
});