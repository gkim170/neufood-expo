// Layout for pantries tab
import React from 'react';
import { Stack } from 'expo-router'; 

const PantriesLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
        name="pantriesindex" 
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="individualpantry" 
        options={{ headerShown: false }}
        />
    </Stack>
  );
};

export default PantriesLayout;