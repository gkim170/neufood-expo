import { View, Text, Image } from 'react-native';
import React from 'react';

interface CustomHeaderProps {
  title: string;
  imageSource: any;
}

const CustomHeader = ({ title, imageSource }: CustomHeaderProps) => {
  return (
    <View className="bg-primary-green flex-row items-center h-20">
        <View className="mt-4">
            <Image 
            source={imageSource} 
            className="w-20 h-20" 
            resizeMode="contain"
            />
        </View>
        <View className="flex-1 items-center justify-center mt-3">
            <Text className="text-2xl font-bold text-center"> 
              {title}
            </Text>
        </View>
        {/* to make the title centered, making this view the same size as the image */}
        <View className="w-20" /> 
    </View>
  );
};

export default CustomHeader;



// <View className="bg-primary-green p-1 flex-row items-center justify-center">
// {/* Left-aligned image */}
// <Image 
//   source={imageSource} 
//   className="w-20 h-20 mr-4" 
//   resizeMode="contain"
// />
// {/* Center-aligned title */}
// <View className="flex-1 items-center"> {/* Wrap Text in a View */}
//   <Text className="text-xl font-bold text-center">
//     {title}
//   </Text>
// </View>
// </View>
