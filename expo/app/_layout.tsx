// defines shared user iterface components

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Images from '@/constants/images'; 
import CustomHeader from "@/components/CustomHeader";
import { StatusBar } from "react-native";

export default function RootLayout() {
    return (
        // SafeAreaProvider ensures content is shown within safe areas on a device
        <SafeAreaProvider>
            <Stack>
                {/* Tabs will be shown on top of index.tsx */}
                <Stack.Screen
                    name="sign-in"
                    options={{
                        header: () => (
                            <CustomHeader 
                                title="Sign In"
                                imageSource={Images.logoNoText} // Replace with actual image source
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="sign-up"
                    options={{
                        header: () => (
                            <CustomHeader 
                                title="Sign Up"
                                imageSource={Images.logoNoText} // Replace with actual image source
                            />
                        ),
                    }}
                />
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

