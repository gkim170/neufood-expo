import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../../components/CustomButton';
import { router } from 'expo-router';

const Pantries = () => {
  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <Text className="font-bold text-2xl my-4">
        pantries
      </Text>
      <CustomButton 
        onPress={() => router.push("./next")} 
        title={'Next page'}
      />
    </View>
  );
};

export default Pantries;