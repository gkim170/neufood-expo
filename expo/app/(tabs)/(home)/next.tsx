import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../../components/CustomButton';
import { router } from 'expo-router';
import BackArrow from '@/components/BackArrow';

const Next = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Next home page rendered');
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <BackArrow/>
      <Text className="font-bold text-2xl my-4">
        Next
      </Text>
    </View>
  );
};

export default Next;