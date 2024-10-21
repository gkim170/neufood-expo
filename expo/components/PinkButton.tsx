// Custom button component that can be reused
import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

// Want to define an interface for props
interface PinkButtonProps {
    onPress: () => void;

    title: string
    // the ? means optional
    textStyles?: string;
    containerStyles?: string;
}

// destructor from the props
const PinkButton = ({ 
    onPress, 
    title, 
    textStyles = "", 
    containerStyles ="",
}: PinkButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.6}
        // use backtick so we can use interpolation
        className={`flex flex-row items-center justify-center bg-primary-pink rounded-2xl mt-6 py-7 w-1/2 ${containerStyles}`}
        onPress={onPress}
    >
        <Text className={`font-semibold text-lg ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  );
};

export default PinkButton;