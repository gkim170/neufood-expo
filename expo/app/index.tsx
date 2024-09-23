import { View, Text} from 'react-native'
import React, { useEffect } from 'react'
// import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from '@/components/NextButton';
import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';


const App = () => {
  useEffect(() => {
    console.log('index rendered');
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  const router = useRouter();

  return (
    <View className="flex-1 bg-custom-background">
        <SafeAreaView className="flex-1 mx-10 my-8 justify-center items-center">
            <View>
              <Text className="font-bold text-2xl my-4">
                Welcome to Neufood
              </Text>
              <Text className="my-4">
                We help shared households save money by:
              </Text>
              <Text className="my-4">
                {'\u2022'} Tracking pantry inventory
              </Text>
              <Text className="my-4">
                {'\u2022'} Recommending ways to fully utilize ingredients
              </Text>
              <NextButton 
                onPress={() => router.push("/info1")} 
                containerStyles="bg-custom-background border-2 border-custom-green rounded-full"
              />
            </View>
        </SafeAreaView>
    </View>
  )
}

export default App

