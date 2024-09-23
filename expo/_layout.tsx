// defines shared user iterface components

import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    // return (
    //     <SafeAreaView>
    //         <Stack>
    //             <Stack.Screen
    //                 name="(tabs)"
    //                 options={{ headerShown: false }}
    //             />
    //             <Stack.Screen
    //                 name="index"
    //                 options={{ headerShown: false }}
    //             />
    //         </Stack>
    //     </SafeAreaView>
    // );
    return <Slot/>;
}

