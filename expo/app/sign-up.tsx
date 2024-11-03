import { View, Text, TextInput, Alert, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import BackArrow from '@/components/BackArrow';
import { Link } from 'expo-router';
import SignInButton from '@/components/DarkButton';
import GoogleButton from '@/components/GoogleButton';
import axios, { AxiosError } from 'axios';
import * as Google from 'expo-auth-session/providers/google';

const url = process.env.EXPO_PUBLIC_API_URL;
const googleWebId = process.env.EXPO_PUBLIC_GOOGLE_WEB_ID;
const redirectVar = process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI;

// Define the expected structure of your error response
interface ErrorResponse {
  message: string;
}

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Google OAuth configuration using useAuthRequest
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: googleWebId,
    redirectUri: redirectVar, // Explicitly set redirect URI to match Google Console
    responseType: 'id_token',
  });

  useEffect(() => {
    if (response?.type === 'success' && response.params.id_token) {
      const idToken = response.params.id_token;
      handleGoogleSignUp(idToken);
    } else if (response?.type === 'error') {
      console.error('OAuth error:', response.error);
      Alert.alert('Error', 'An error occurred during Google sign-up.');
    }
  }, [response]);

  const handleSignUp = async () => {
    const name = `${firstName} ${lastName}`;
  
    try {
      // Make a POST request to the backend server
      const response = await axios.post(`${url}/auth/register`, {
        name,
        email,
        password,
      });
  
      // Log the response from the server
      console.log('Sign-up successful:', response.data);
      Alert.alert('Success', 'User registered successfully!'); // Optional: to give feedback to the user
  
    } catch (error) {
      const axiosError = error as AxiosError;
  
      if (axiosError.response) {
        // Assert that response.data matches the ErrorResponse structure
        const errorData = axiosError.response.data as ErrorResponse;
        
        console.error('Error during sign-up:', errorData.message);
        Alert.alert('Error', errorData.message || 'Server error. Please try again.');
      } else {
        console.error('Error during sign-up:', axiosError.message);
        Alert.alert('Error', 'An unknown error occurred. Please try again.');
      }
    }
  };

  const handleGoogleSignUp = async (idToken: string) => {
    try {
      const result = await axios.post(`${url}/auth/google`, {
        token: idToken,
      });
      console.log('Google sign-up successful:', result.data);
      Alert.alert('Success', 'Google account used for sign-up successfully!');
    } catch (error) {
      const err = error as Error;
      console.error('Error during Google sign-up:', err.message);
      Alert.alert('Error', 'Failed to sign up with Google.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-background px-10">
      <StatusBar barStyle="dark-content"/>
      <BackArrow />

      <View className="flex flex-row justify-between w-full mb-4 mt-5">
        <TextInput
          className="border border-black rounded-2xl p-7 pl-4 pt-2 w-[48%] mr-2"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#6D6868"
        />
        <TextInput
          className="border border-black rounded-2xl p-7 pl-4 pt-2 w-[48%]"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#6D6868"
        />
      </View>

      <TextInput
        className="border border-black rounded-2xl p-7 pl-4 pt-2 mb-4 w-full"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#6D6868"
      />
      <TextInput
        className="border border-black rounded-2xl p-7 pl-4 pt-2 mb-4 w-full"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#6D6868"
      />

      <SignInButton onPress={handleSignUp} title={'Sign Up'} />

      <GoogleButton onPress={() => promptAsync()} />

      <View className="flex mt-4">
        <Text className="font-primary text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-gray-600 underline">
            Sign in.
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;