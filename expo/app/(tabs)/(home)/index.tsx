import { View, Text} from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../../components/CustomButton';
import { router } from 'expo-router';

const HomePage = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Home page rendered');
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <Text className="font-bold text-2xl my-4">
        home
      </Text>
      <CustomButton 
        onPress={() => router.navigate("./next")} 
        title={'Next'}
      />
    </View>
  );
};

export default HomePage;