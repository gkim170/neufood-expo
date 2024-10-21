import { TouchableOpacity, Text, Image, View, ImageSourcePropType } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

/**
 * for an individual pantry, should return one pressable object that can be dynamically
 *      named and such in order to route to a user's individual pantry.
 */

interface PantryButtonProps {
  onPress: () => void;
  title: string;
  imageSource: ImageSourcePropType; // Add a prop for the image source
  textStyles?: object;
  containerStyles?: object;
}

const PantryButton = ({
  onPress,
  title,
  imageSource, // Add imageSource to the props
  textStyles = {},
  containerStyles = {},
}: PantryButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ //general styling options, can change whenever for overall button
        width: '90%',
        height: 200,
        borderRadius: 15,
        backgroundColor: Colors.primaryGreen,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        ...containerStyles,
      }}
    >
      <Image
        source={imageSource} // Use the dynamic image source so we can change image in future if we want
        style={{ //same deal here depending on how we want the image to look.
          width: '65%',
          height: '100%',
          borderRadius: 10, //tweak with that
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, ...textStyles }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PantryButton;
