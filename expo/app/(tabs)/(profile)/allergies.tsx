import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../../components/CustomButton';
import { router } from 'expo-router';
import BackArrow from '@/components/BackArrow';


const allergies = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Allergies page rendered');
  }, []);

const handleEdit = () => {
  console.log('edit allergies...'); 
    
    // // Navigate to edit profile
    // navigation.navigate('editprofile', { 
    //   user,
    //   updateUser: (updatedUser) => setUser(updatedUser),
    //  });
}

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <View style={styles.container}>
        <View style={styles.back}>
            <BackArrow/>
        </View>
        <TouchableOpacity
            style={styles.editbutton}
            onPress={handleEdit}>
              <Text style={styles.textedit}>Edit</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.body}>
        <Text className="font-bold text-2xl my-4" style={styles.title}>
          My Allergies
        </Text>
        <View style={styles.allergybuttons}>

        </View>
      </View>
    </View>
  );
};


export default allergies;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',          
    justifyContent: 'space-between', 
    alignItems: 'center',           
    paddingHorizontal: 10,
    height: 60,                     
    marginTop: 5,
  },
  back: {
    flex: 1,
    padding: 10,
    marginBottom: 30,
  },  
  editbutton: {
    flex: 1,
    padding: 10,
    paddingTop: 30, 
  },
  textedit: {
    textAlign: 'right',
  },
  body: {
    flex: 7,
    paddingTop: 40,
  },
  title: {
    textAlign: 'left',
  },
  allergybuttons: {},
})