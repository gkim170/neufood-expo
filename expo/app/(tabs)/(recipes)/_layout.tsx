// home/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router'; // You could also use Tabs if required

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