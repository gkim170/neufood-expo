// Custom button component that can be reused
import { TouchableOpacity, Text, Image, View } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

// Want to define an interface for props
interface GoogleButtonProps {
    onPress: () => void;
    // the ? means optional
    textStyles?: string;
    containerStyles?: string;
}

// destructor from the props
const GoogleButton = ({ 
    onPress, 
    textStyles = "", 
    containerStyles ="",
}: GoogleButtonProps) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.6}
        // use backtick so we can use interpolation
        className={`flex flex-row items-center justify-center bg-white mt-4 mb-4 border-white rounded-full py-4 w-3/4 ${containerStyles}`}
        onPress={onPress}
    >
        <View className="flex-row items-center">
            <Image
                source={require('@/assets/images/google-logo.png')}
                className="w-10 h-10 mr-1" 
            />
            <Text className="text-black text-md font-primary"> Continue with Google</Text>
        </View>
    </TouchableOpacity>
  );
};

export default GoogleButton;