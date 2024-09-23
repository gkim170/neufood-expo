import { View, Text} from 'react-native'
import React, { useEffect } from 'react'
// import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from '@/components/NextButton';
import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';


const Info2 = () => {
  useEffect(() => {
    console.log('info2 rendered');
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  const router = useRouter();

  return (
    <View className="flex-1 bg-custom-background">
        <SafeAreaView className="flex-1 mx-10 my-8 justify-center items-center">
            <View>
              <Text className="font-bold text-2xl my-4">
                Scan your grocery receipts to add ingredients to your shared pantry
              </Text>
              <Text className="my-2">
                You’ll be able to track:
              </Text>
              <Text className="my-1">
                {'\u2022'} Cost
              </Text>
              <Text className="my-1">
                {'\u2022'} Quantity
              </Text>
              <Text className="my-1">
                {'\u2022'} Date purchased
              </Text>
              <Text className="my-1">
                {'\u2022'} Expiration date
              </Text>
              <NextButton 
                onPress={() => router.push("/info3")} 
                containerStyles="bg-custom-background border-2 border-custom-green rounded-full"
              />
            </View>
        </SafeAreaView>
    </View>
  );
};

export default Info2;


