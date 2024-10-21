import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import DarkButton from '@/components/DarkButton';
import BackArrow from '@/components/BackArrow';
import { router } from 'expo-router';

const Success = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Individual pantry page rendered');
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <BackArrow/>
      <Text className="font-bold text-2xl my-4">
        INDIVIDUAL PANTRY!
      </Text>

      {/* Need button format to be this */}
      <DarkButton 
        onPress={() => router.push("./pantriesindex")} 
        title={'Back to Pantries'}
      />
    </View>
  );
};

export default Success;