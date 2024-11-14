import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackArrow = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("Can't go back - no previous screen in stack.");
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={{
        position: 'absolute',
        left: 16, // Adjust based on layout needs
        top: 16,
        padding: 8,
        zIndex: 10
      }}
    >
      <Ionicons name="chevron-back" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default BackArrow;