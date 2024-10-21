// Layout for recipes tab
import React from 'react';
import { Stack } from 'expo-router'; 

const RecipesLayout = () => {
  return (
    <Stack
      screenOptions={{ 
        headerShown: false,
        animation: 'none',
    }}>
        <Stack.Screen name="recipesIndex" />
        <Stack.Screen name="selection" />
        <Stack.Screen name="generated" />
        <Stack.Screen name="[id]" />
        <Stack.Screen name="favorites" />    
    </Stack>
  );
};

export default RecipesLayout;