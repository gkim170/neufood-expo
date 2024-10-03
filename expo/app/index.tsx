import { View, Text} from 'react-native'
import React, { useEffect, useState } from 'react'
// import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'react-native';
import InitialInfoPager from '@/components/InitialInfoPager';

const App = () => {
  useEffect(() => {
    console.log('index rendered');
    StatusBar.setBarStyle('dark-content', true);
  }, []);


  return (
    <SafeAreaView className="flex-1 bg-custom-background">
      {/* Initial info slides from InitialInfoPager component */}
      <InitialInfoPager/>
    </SafeAreaView>
  )
}

export default App

