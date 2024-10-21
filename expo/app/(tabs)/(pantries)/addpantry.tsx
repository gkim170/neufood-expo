import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import DarkButton from '@/components/DarkButton';
import BackArrow from '@/components/BackArrow';
import { router } from 'expo-router';

const AddPantry = () => {
  const [pantryName, setPantryName] = useState('');
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Add pantries page rendered');
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <BackArrow/>
      <Text className="font-bold text-2xl my-4">
        Create your Pantry
      </Text>

      {/* Pantry Name Input */}
      <TextInput
        className="border border-black rounded-2xl p-7 pl-4 pt-2 mb-4 w-full"
        placeholder="Pantry Name"
        value={pantryName}
        onChangeText={setPantryName}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#6D6868"
      />
      {/* Need button format to be this */}
      <DarkButton 
        onPress={() => router.push("./addcontributors")} 
        title={'Next'}
      />
    </View>
  );
};

export default AddPantry;