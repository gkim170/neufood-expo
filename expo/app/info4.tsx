import { View, Text} from 'react-native'
import React, { useEffect } from 'react'
// import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';


const Info4 = () => {
  useEffect(() => {
    console.log('info4 rendered');
    StatusBar.setBarStyle('dark-content', true);
  }, []);

  const router = useRouter();

  return (
    <View className="flex-1 bg-custom-background">
        <SafeAreaView className="flex-1 mx-10 my-8 justify-center items-center">
            <View>
                <Text className="font-bold text-2xl my-4">
                Ready to get started?
                </Text>
                <CustomButton 
                onPress={() => router.push("/home")} 
                title={'Get Started'}/>
            </View>
        </SafeAreaView>
    </View>
  );
};

export default Info4;


