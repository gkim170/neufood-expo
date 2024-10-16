// Custom button component that can be reused
import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

// Want to define an interface for props
interface CustomButtonProps {
    onPress: () => void;

    title: string
    // the ? means optional
    textStyles?: string;
    containerStyles?: string;
}

// destructor from the props
const CustomButton = ({ 
    onPress, 
    title, 
    textStyles = "", 
    containerStyles ="",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.6}
        // use backtick so we can use interpolation
        className={`flex flex-row items-center justify-center bg-custom-background border-2 border-custom-green rounded-full mt-4 py-5 w-1/2 ${containerStyles}`}
        onPress={onPress}
    >
        <Text className={`font-semibold text-lg ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;