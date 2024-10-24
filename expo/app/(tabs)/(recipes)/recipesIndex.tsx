import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import PinkButton from '../../../components/PinkButton';
import { router } from 'expo-router';

const RecipesIndex = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Recipes page rendered');
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <PinkButton 
        onPress={() => router.push("./favorites")} 
        title={'My Favorites'}
      />
      <PinkButton 
        onPress={() => router.push("./selection")} 
        title={'Generate Recipes'}
      />
    </View>
  );
};

export default RecipesIndex;