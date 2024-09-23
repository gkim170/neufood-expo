// defines shared user iterface components

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen
                    name="info1"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="info2"
                    options={{ headerShown: false }}
                />
               <Stack.Screen
                    name="info3"
                    options={{ headerShown: false }}
                />
               <Stack.Screen
                    name="info4"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}

