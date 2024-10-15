// Layout for recipes tab
import React from 'react';
import { Stack } from 'expo-router'; 

const RecipesLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
        name="index" 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="next" 
        options={{ headerShown: false }}
        />
    </Stack>
  );
};

export default RecipesLayout;