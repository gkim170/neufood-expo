import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import BackArrow from '@/components/BackArrow';
import { FontAwesome } from '@expo/vector-icons'; // for Google icon
import SignInButton from '@/components/SignInButton';
import GoogleButton from '@/components/GoogleButton';
import { Link } from 'expo-router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Handle sign-in logic here 
    console.log('Sign in with:', email, password);
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic
    console.log('Sign in with Google');
  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-background px-10">
        <StatusBar barStyle="dark-content"/>
      {/* Back Arrow */}
      <BackArrow />

      {/* Title */}
      <Text className="font-bold text-3xl mb-10">Welcome Back</Text>

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

      {/* Sign In Button */}
      <SignInButton
            onPress={handleSignIn}
            title={'Sign In'}
        />

      {/* Sign In with Google Button */}
      <GoogleButton
        onPress={handleGoogleSignIn}
      />
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
