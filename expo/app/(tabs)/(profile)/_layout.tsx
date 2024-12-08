// Layout for profile tab
import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="editprofile" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="allergies" />
      <Stack.Screen name="badges" />
      <Stack.Screen name="friends" />
    </Stack>
  );
};

export default ProfileLayout;