import React from 'react';
import { View, Text, Image, ImageStyle } from 'react-native';
import Images from '@/constants/images'; // Import the images from images.ts

interface InfoPageStyleProps {
  title: string;
  children: React.ReactNode;
  // image, imageStyle, imageWidth, imageHeight, and imageResizeMode are optional, shown by the ?
  image?: keyof typeof Images;
  imageStyle?: ImageStyle; 
  imageWidth?: number; 
  imageHeight?: number; 
  imageResizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'; 
}

// "React.FC is a type that stands for "Function Component" in React. 
// It is a generic type that allows you to specify the props that a function component will accept."
// https://dev.to/elhamnajeebullah/react-typescript-what-is-reactfc-and-why-should-i-use-it-4029
const InfoPageStyle: React.FC<InfoPageStyleProps> = ({
  title,
  children,
  image,
  imageStyle,
  imageWidth = 200, // default values
  imageHeight = 200,
  imageResizeMode = 'contain',
}) => {
  return (
    <View className="flex-1 justify-center items-center p-4 mb-20">
      {/* If image is passed in as a prop, it is displated first */}
      {image && (
        <Image
          source={Images[image]} // Use the image from the images object
          style={[
            { width: imageWidth, height: imageHeight, marginBottom: 5 },
            imageStyle,
          ]}
          resizeMode={imageResizeMode}
        />
      )}
      {/* Then title that is passed in as a prop is diplayed next */}
      <Text className="font-extraBold text-2xl mb-4 text-center">{title}</Text>
      {children}
    </View>
  );
};

export default InfoPageStyle;
