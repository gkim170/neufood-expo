// defines shared user iterface components

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        // SafeAreaProvider ensures content is shown within safe areas on a device
        <SafeAreaProvider>
            <Stack>
                {/* Tabs will be shown on top of index.tsx */}
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }} // Hides the header for the tab layout screen
                />
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}

