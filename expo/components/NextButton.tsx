// Not using for anything at the moment 
// But a custom right-arrow button component that can be resused

import { TouchableOpacity, Text } from 'react-native'
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface NextButtonProps {
    onPress: () => void;
    containerStyles?: string; 
}

const NextButton = ({ 
    onPress, 
    containerStyles = "",
}: NextButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.7}
        className={`bg-custom-background border-2 border-custom-green rounded-full min-h-[62px] justify-center items-center ${containerStyles}`}
        onPress={onPress}
    >
        <Ionicons name="arrow-forward" size={24} color="green" /> 
    </TouchableOpacity>
  );
};

export default NextButton;
