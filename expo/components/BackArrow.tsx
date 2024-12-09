import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackArrow = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      className="absolute left-4 top-5 p-2 z-10"
      onPress={() => navigation.goBack()}
    >
        <Ionicons name="chevron-back" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default BackArrow;