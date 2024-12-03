import { View, Text, TextInput, StatusBar, Alert } from 'react-native';
import React, { useState } from 'react';
import BackArrow from '@/components/BackArrow';
import SignInButton from '@/components/DarkButton';
import GoogleButton from '@/components/GoogleButton';
import { Link, router } from 'expo-router';
import axios, { AxiosError } from 'axios';
import WelcomeModal from '@/components/WelcomeModal'; // Import the WelcomeModal
import { useAuth } from '@/components/AuthContext';

const url = process.env.EXPO_PUBLIC_API_URL;

// Define the expected structure of your error response
interface ErrorResponse {
  message: string;
}

const SignIn = () => {
  const { setAuthState } = useAuth(); // Use the AuthContext to set auth state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSignIn = async () => {
    try {
      // Make a POST request to the backend server
      const response = await axios.post(`${url}/auth/login`, { email, password });
      const { uid } = response.data; // Assuming the response includes UID as "uid"

      // Persist the UID in the AuthContext
      await setAuthState({ uid });

      // Fetch user info to get the name for the welcome message
      const userResponse = await axios.get(`${url}/users/${uid}`);
      setUserName(userResponse.data.name);

      // Show the welcome modal
      setShowModal(true);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponse;
        console.error('Error during sign-in:', errorData.message);
        Alert.alert('Error', errorData.message || 'Server error. Please try again.');
      } else {
        console.error('Error during sign-in:', axiosError.message);
        Alert.alert('Error', 'An unknown error occurred. Please try again.');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/(home)'); // Redirect to home page after modal closes
  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-background px-10">
      <StatusBar barStyle="dark-content" />

      <BackArrow />

      <Text className="font-bold text-3xl mb-10">Welcome Back</Text>

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

      <SignInButton onPress={handleSignIn} title="Sign In" />
      <GoogleButton onPress={() => console.log('Sign in with Google')} />

      <WelcomeModal visible={showModal} name={userName} onAnimationEnd={handleModalClose} />

      <View className="flex">
        <Text className="font-primary text-gray-600">
          Don't have an account?{' '}
          <Link href="/sign-up" className="text-gray-600 underline">
            Create an account.
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;