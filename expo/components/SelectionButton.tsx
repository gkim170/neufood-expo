import React from 'react';
import { TouchableOpacity, Text } from 'react-native';


const SelectionButton = ({ isSelected, onPress, label }) => {
 return (
   <TouchableOpacity
     className={`m-1 p-1 rounded-lg ${isSelected ? 'bg-custom-green' : 'bg-primary-green'}`}
     onPress={onPress}
     activeOpacity={1} // Disable the default opacity change on press
   >
     <Text className={`text-center ${isSelected ? 'text-white' : 'text-black'}`}>{label}</Text>
   </TouchableOpacity>
 );
};


export default SelectionButton;
