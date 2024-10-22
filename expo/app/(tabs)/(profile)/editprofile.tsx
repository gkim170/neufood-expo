import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../../components/CustomButton';
import { router } from 'expo-router';
import BackArrow from '@/components/BackArrow';
import Images from '@/constants/images'; 


const editProfile = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Edit profile page rendered');
  }, []);

  // state to store form data
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');

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
    console.log('Form Submitted.', `Name: ${firstname + ' ' + lastname}, Email: ${email}`);
    // more actions

  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <BackArrow/>
      {/* <Image source={Images.profpic}/> */}
      
      {/* input for first name */}
      <TextInput
        style={[styles.input, error && !firstname ? styles.errorInput : null]}
        placeholder="First *"
        placeholderTextColor="#888"
        value={firstname}
        onChangeText={setFirstName}
      />

      {/* input for last name */}
      <TextInput
        style={[styles.input, error && !lastname ? styles.errorInput : null]}
        placeholder="Last"
        placeholderTextColor="#888"
        value={lastname}
        onChangeText={setLastName}
      />

      {/* input for email */}
      <TextInput
        style={[styles.input, error && !email ? styles.errorInput : null]}
        placeholder="Email *"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* input for password */}
      <TextInput
        style={[styles.input, error && !lastname ? styles.errorInput : null]}
        placeholder="Password *"
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
  );
};

export default editProfile;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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