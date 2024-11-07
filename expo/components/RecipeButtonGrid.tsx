import React, { useState } from 'react';
import { View } from 'react-native';
import SelectionButton from './SelectionButton'; 

const ButtonGrid = () => {
  // Initialize state of all buttons to false or unselected
  const [selectedButtons, setSelectedButtons] = useState([false, false, false, false, false, false, false, false]);


  // Define button names for each row
  const recipeTypeButtons = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack"
  ];

  const recipeTimeButtons = [
    "0-10 minutes",
    "10-30 minutes",
    "30 min-1 hr",
    "> 1 hr"
  ];


  // Change the button state when pressed
  const toggleButton = (index) => {
    setSelectedButtons((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index]; 
      return newSelected;
    });
  };


  return (
    <View className="justify-center items-center p-2 ">
      {/* Row 1: Recipe types */}
      <View className="flex-row flex-wrap justify-center mb-2">
        {recipeTypeButtons.map((buttonLabel, index) => (
          <SelectionButton
            key={index}
            isSelected={selectedButtons[index]}
            onPress={() => toggleButton(index)}
            label={buttonLabel}
          />
        ))}
      </View>

      {/* Row 2: Recipe times */}
      <View className="flex-row flex-wrap justify-center mb-2">
        {recipeTimeButtons.map((buttonLabel, index) => (
          <SelectionButton
            key={index + 4} // Start index at 4 for the second row and so each button has a unique index
            isSelected={selectedButtons[index + 4]}
            onPress={() => toggleButton(index + 4)}
            label={buttonLabel}
          />
        ))}
      </View>
    </View>
  );
  };

export default ButtonGrid;
