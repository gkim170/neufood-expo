import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import SignInButton  from '../../../components/SignInButton';
import { router } from 'expo-router';
import BackArrow from '@/components/BackArrow';

const Selection = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Recipe generator selections page rendered');
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <BackArrow/>
      <Text className="font-bold text-2xl my-4">
        Make Selections for Recipes
      </Text>
      <SignInButton 
        onPress={() => router.push("./generated")} 
        title={'Show Me Recipes'}
      />
    </View>
  );
};

export default Selection;