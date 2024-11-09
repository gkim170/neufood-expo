// RecipesPantryButton Component
import { TouchableOpacity, Text, Image, ImageSourcePropType, View } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface RecipesPantryButtonProps {
  onPress: () => void;
  title: string;
  imageSource: ImageSourcePropType;
  isSelected: boolean; // Added to check if the button is selected
  textStyles?: object;
  containerStyles?: object;
}

const RecipesPantryButton = ({
  onPress,
  title,
  imageSource,
  isSelected,
  textStyles = {},
  containerStyles = {},
}: RecipesPantryButtonProps) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={1} // disable opacity, less busy looking
        style={{ //general styling options, can change whenever for overall button
        width: 300,
        height: 150,
        borderRadius: 15,
        backgroundColor: isSelected ? Colors.darkGreen : Colors.primaryGreen, // Change color based on selection
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 15,
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
            width: 140,
            height: 120,
            borderRadius: 10, //tweak with that
        }}
        resizeMode="cover"
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text 
                style={{ 
                    fontSize: 20, 
                    color: isSelected ? 'white' : 'black', 
                    textAlign: 'center', 
                    ...textStyles 
                }}
                >
                {title}
            </Text>
        </View>
    </TouchableOpacity>
  );
};

export default RecipesPantryButton;