import { View, Text} from 'react-native'
import React, { useEffect } from 'react'
// import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import NextButton from '@/components/NextButton';
import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';


const Info1 = () => {
  useEffect(() => {
    console.log('info1 rendered');
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  const router = useRouter();

  return (
    <View className="flex-1 bg-custom-background">
        <SafeAreaView className="flex-1 mx-10 my-8 justify-center items-center">
            <View>
              <Text className="font-bold text-2xl my-4">
                Create a pantry
              </Text>
              <Text className="my-4">
                Add your household members as contributors
              </Text>
              <NextButton 
                onPress={() => router.push("/info2")} 
                containerStyles="bg-custom-background border-2 border-custom-green rounded-full"
              />
            </View>
        </SafeAreaView>
    </View>
  );
};

export default Info1;


