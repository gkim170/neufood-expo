import { View, Text, StatusBar } from 'react-native'
import React from 'react'
// import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';

const App = () => {
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
      <StatusBar barStyle="dark-content" />
    </View>
  )
}

export default App