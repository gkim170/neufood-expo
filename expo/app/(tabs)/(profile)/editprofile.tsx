import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../../components/CustomButton';
import { router } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackArrow from '@/components/BackArrow';
import Images from '@/constants/images'; 
import ImageViewer from '@/components/ImageViewer';


// install the package beforehead
import * as ImagePicker from 'expo-image-picker';


const editProfile = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Edit profile page rendered');
  }, []);

  const route = useRoute();
  const navigation = useNavigation();
  const { user } = route.params;

  // state to store form data
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

  // state to store profile picture
  const [selectedImage, setSelectedImage] = useState('');

  // state to track validation errors
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = () => { 
    // Basic validation
    if (!firstname || !email || !passwd) {
      setError('Please fill in fields that have a *.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setError(''); // Clear error if validation passes
    console.log('Form Submitted.', `Name: ${firstname + ' ' + lastname}, Email: ${email}`, ` image: ${selectedImage}`);

    // format the value to be passed back to profile home page
    const data = {firstname, lastname, email, passwd, selectedImage};
    route.params.updateUser(data);
    navigation.goBack();
  };

  // function to choose an image
  const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          console.log(result);
        } else {
          alert('You did not select any image.');
        }
      };

  return (
    <View className="flex-1 justify-center items-center bg-custom-background" style={styles.container}>
      <BackArrow/>

      {/* profile picture to be uploaded */}
      <View style={styles.imageselect}>
       {/* image holder */}
       <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImageAsync}>
            <ImageViewer
              placeholderImageSource={user.selectedImage}
              selectedImage={selectedImage}
            />
        </TouchableOpacity>
       </View>
       {/* buttons to select and use photo */}
     </View>
      <View style={styles.form}>
        {/* input for first name */}
        <TextInput
          style={[styles.input, error && !firstname ? styles.errorInput : null]}
          placeholder={user.firstname == 'User' ? "First *" : user.firstname}
          placeholderTextColor="#888"
          value={firstname}
          onChangeText={setFirstName}
        />

        {/* input for last name */}
        <TextInput
          style={[styles.input, error && !lastname ? styles.errorInput : null]}
          placeholder={user.lastname == '' ? "Last" : user.lastname}
          placeholderTextColor="#888"
          value={lastname}
          onChangeText={setLastName}
        />

        {/* input for email */}
        <TextInput
          style={[styles.input, error && !email ? styles.errorInput : null]}
          placeholder={user.email == 'neufood@example.com' ? "Email *" : user.email}
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* input for password */}
        <TextInput
          style={[styles.input, error && !lastname ? styles.errorInput : null]}
          placeholder={user.passwd == '' ? "Password *" : '*'.repeat(user.passwd.length)}
          placeholderTextColor="#888"
          value={passwd}
          onChangeText={setPasswd}
        />

        {/* <Text style={styles.label}>
          First <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, error && !firstname ? styles.errorInput : null]}
          placeholder="Enter your name"
          value={firstname}
          onChangeText={setFirstName}
        /> */}

        {/* Error Message */}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Submit Button */}
        <CustomButton title="Save Changes" onPress={handleSubmit} />

      </View>

    </View>
  );
};

export default editProfile;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageselect: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  form: {
    flex: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 48,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    marginLeft: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    width: '85%',
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
  },
  errorInput: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});