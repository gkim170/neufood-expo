import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer
import { SafeAreaProvider } from "react-native-safe-area-context";
import Images from '@/constants/images'; 
import CustomHeader from "@/components/CustomHeader";
import { StatusBar } from "react-native";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <NavigationContainer> {/* Wrap everything inside NavigationContainer */}
                <Stack 
                    screenOptions={{ 
                        headerShown: false, 
                        animation: 'none', 
                    }}
                >
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
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="index" />
                </Stack>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
