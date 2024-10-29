// Custom button component that can be reused
import { TouchableOpacity, StyleProp, ViewStyle, Text } from 'react-native'
import React from 'react'

interface DarkButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    containerStyles?: string;
    style?: StyleProp<ViewStyle>; // Allows inline styles
}

const DarkButton = ({ 
    onPress, 
    title, 
    textStyles = "", 
    containerStyles = "",
    style, // Destructure `style` from props
}: DarkButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.6}
        style={style} // Apply inline styles here
        className={`flex flex-row items-center justify-center bg-secondary-green rounded-full py-5 w-3/4 ${containerStyles}`}
        onPress={onPress}
    >
        <Text className={`font-semibold text-white text-lg ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  );
};

export default DarkButton;