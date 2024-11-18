import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Images from '@/constants/images'; 
import CustomHeader from "@/components/CustomHeader";
import { StatusBar } from "react-native";
import { AuthProvider, useAuth } from "@/components/AuthContext"; // Import your AuthProvider

export default function RootLayout() {
    return (
        <AuthProvider> {/* Wrap the entire app in AuthProvider */}
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'none',
                        }}
                    >
                        {/* Sign-In Screen */}
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

                        {/* Sign-Up Screen */}
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

                        {/* Tabs (Main Navigation) */}
                        <Stack.Screen name="(tabs)" />

                        {/* Index Page */}
                        <Stack.Screen name="index" />
                    </Stack>
                </NavigationContainer>
            </SafeAreaProvider>
        </AuthProvider>
    );
}