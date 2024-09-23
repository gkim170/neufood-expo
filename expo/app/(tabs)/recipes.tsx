import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const recipes = () => {
  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <Text className="font-bold text-2xl my-4">
        recipes
      </Text>
      {/* <StatusBar style="dark" /> */}
    </View>
  );
};

export default recipes;