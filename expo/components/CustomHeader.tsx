import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

interface CustomHeaderProps {
  title: string;
  imageSource: any;
}

const CustomHeader = ({ title, imageSource }: CustomHeaderProps) => {
  const navigation = useNavigation();

  const handleImagePress = () => {
    // Navigate to home without any parameters
    // Using navigate because if we use expo router there can be issues with params passed
    navigation.navigate('(home)'); 
  };

  return (
    <View className="bg-primary-green flex-row items-center h-25">
      <View className="mt-8">
        <TouchableOpacity onPress={handleImagePress}>
          <Image 
            source={imageSource} 
            className="w-20 h-20" 
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center justify-center mt-8">
        <Text className="text-2xl font-bold text-center"> 
          {title}
        </Text>
      </View>
      {/* To make the title centered, making this view the same size as the image */}
      <View className="w-20" /> 
    </View>
  );
};

export default CustomHeader;
