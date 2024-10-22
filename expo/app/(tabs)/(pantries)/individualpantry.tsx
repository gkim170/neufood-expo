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
  // Dynamically populated, horizontally scrolling toolbar that switches views and populates data
  // Add ingredient button
    // OnClick popup a bubble, item name, total price, category, expiration date, quantity counter
  
  // Base (no ingredient)
  // Arrow pointing up to add ingredient
  // 'No Ingredients"
  // "Add ingredients manually or scan your grocery receipt"
  // (no ingredients) arrow pointing down to scanner
  
  // (At least one ingredient in the pantry, ingredients are populated in a grid)
  // Search bar ? sorting criteria as well?
  // Individual ingredient tab with heart, info icon, picture, name, quantity, and 'use' button
    // onClick flip over, show totalprice, category, expiration date, name, edit, delete. onclick flips back
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