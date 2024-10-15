// Layout for scanner tab
import React from 'react';
import { Stack } from 'expo-router'; 

const ScannerLayout = () => {
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

export default ScannerLayout;