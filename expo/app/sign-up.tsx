import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import React, { useState } from 'react';
import BackArrow from '@/components/BackArrow';
import { Link, router } from 'expo-router';
import SignInButton from '@/components/DarkButton';
import GoogleButton from '@/components/GoogleButton';
import axios, { AxiosError } from 'axios';
import WelcomeModal from '@/components/WelcomeModal'; // Import the custom modal
import { useAuth } from '@/components/AuthContext'; // Import AuthContext

const url = process.env.EXPO_PUBLIC_API_URL;

// Define the expected structure of your error response
interface ErrorResponse {
  message: string;
}

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { setAuthState } = useAuth(); // Use the AuthContext
  const [userName, setUserName] = useState('');

  const handleSignUp = async () => {
    const name = `${firstName} ${lastName}`;

    try {
      // Make a POST request to the backend server
      const response = await axios.post(`${url}/auth/register`, {
        name,
        email,
        password,
      });

      const { uid, token } = response.data; // Assuming the response includes UID as "uid" and JWT token as "token"

      // Save UID and JWT to AuthContext
      setAuthState({ uid });

      // Fetch user info to get the name for the welcome message
      const userResponse = await axios.get(`${url}/users/${uid}`);
      setUserName(userResponse.data.name); // Assuming the response includes "name"

      // Show the welcome modal
      setShowModal(true);
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

  const handleModalClose = () => {
    setShowModal(false);
    router.push('/(home)'); // Redirect to home page after modal closes
  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-background px-10">
      <StatusBar barStyle="dark-content" />
      {/* Back Arrow */}
      <BackArrow />

      {/* Name Input Fields */}
      <View className="flex flex-row justify-between w-full mb-4 mt-5">
        {/* First Name Input */}
        <TextInput
          className="border border-black rounded-2xl p-7 pl-4 pt-2 w-[48%] mr-2"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#6D6868"
        />

        {/* Last Name Input */}
        <TextInput
          className="border border-black rounded-2xl p-7 pl-4 pt-2 w-[48%]"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#6D6868"
        />
      </View>

      {/* Email Input */}
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

      {/* Password Input */}
      <TextInput
        className="border border-black rounded-2xl p-7 pl-4 pt-2 mb-4 w-full"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#6D6868"
      />

      {/* Sign Up Button */}
      <SignInButton onPress={handleSignUp} title={'Sign Up'} />

      {/* Sign In with Google Button */}
      <GoogleButton onPress={() => console.log('Sign in with Google')} />

      {/* Success Modal */}
      <WelcomeModal visible={showModal} name={userName} onAnimationEnd={handleModalClose} />

      {/* Link to Sign In */}
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