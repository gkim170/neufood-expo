// Custom button component that can be reused
import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

// Want to define an interface for props
interface SignInButtonProps {
    onPress: () => void;

    title: string
    // the ? means optional
    textStyles?: string;
    containerStyles?: string;
}

// destructor from the props
const SignInButton = ({ 
    onPress, 
    title, 
    textStyles = "", 
    containerStyles ="",
}: SignInButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.6}
        // use backtick so we can use interpolation
        className={`flex flex-row items-center justify-center bg-secondary-green rounded-full py-5 w-3/4 ${containerStyles}`}
        // className="flex flex-row items-center justify-center bg-custom-background border-custom-green border-2 rounded-full py-3 mt-4 w-full"
        onPress={onPress}
    >
        <Text className={`font-semibold text-white text-lg ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  );
};

export default SignInButton;