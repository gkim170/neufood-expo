import React, { useState } from 'react';
import { View } from 'react-native';
import SelectionButton from './SelectionButton'; 

const AllergyGrid = () => {
  // Initialize state of all buttons to false or unselected
  const [selectedButtons, setSelectedButtons] = useState([false, false, false, false, 
                                                        false, false, false, false,
                                                        false, false]);


  // Define button names for each row
//   const recipeTypeButtons
  const allergyFirstRow = [
    "Egg",
    "Peanut",
    "Treenut",
    "Dairy"
  ];

  const allergySecondRow = [
    "Fish",
    "Soy",
    "Shellfish",
    "Gluten"
  ]

  const allergyThirdRow = [
    "Wheat",
    "Sesame"
  ]



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
      {/* Row 1 */}
      <View className="flex-row flex-wrap justify-center mb-2">
        {allergyFirstRow.map((buttonLabel, index) => (
          <SelectionButton
            key={index}
            isSelected={selectedButtons[index]}
            onPress={() => toggleButton(index)}
            label={buttonLabel}
          />
        ))}
      </View>

      {/* Row 2 */}
      <View className="flex-row flex-wrap justify-center mb-2">
        {allergySecondRow.map((buttonLabel, index) => (
          <SelectionButton
            key={index + 4}
            isSelected={selectedButtons[index + 4]}
            onPress={() => toggleButton(index + 4)}
            label={buttonLabel}
          />
        ))}
      </View>

      {/* Row 3 */}
      <View className="flex-row flex-wrap justify-center mb-2">
        {allergyThirdRow.map((buttonLabel, index) => (
        <SelectionButton
            key={index + 4}
            isSelected={selectedButtons[index + 8]}
            onPress={() => toggleButton(index + 8)}
            label={buttonLabel}
        />
        ))}
      </View>
    </View>


  );
  };

export default AllergyGrid;