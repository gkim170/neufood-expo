import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import SelectionButton from './SelectionButton'; 

interface PreferenceProps {
  onMessageSend: (message: string[][]) => void;
}

const PreferenceGrid: React.FC<PreferenceProps> = ({ onMessageSend }) => {

  // Initialize state of all buttons to false or unselected
  const [selectedDiet, setSelectedDiet] = useState([false, false, false,
                                                    false, false, false]);
  const [selectedCuisine, setSelectedCuisine] = useState([false, false, false, false,
                                                        false, false, false, false,
                                                        false, false, false, false,
                                                        false, false, false]);


  // Define button names for each row
  const dietFirstRow = [
    "Vegetarian",
    "Vegan",
    "Ketogenic"
  ];

  const dietSecondRow = [
    "Gluten-free",
    "Dairy-free",
    "Atkins"
  ];

  const diet = [ "Vegetarian", "Vegan", "Ketogenic",
        "Gluten-free", "Dairy-free", "Atkins"];

  const cuisineFirstRow = [
    "Italian",
    "Japanese",
    "Chinese",
    "Indian"
  ];

  const cuisineSecondRow = [
    "Mexican",
    "Thai",
    "French",
    "American"
  ];

  const cuisineThirdRow = [
    "Greek",
    "Korean",
    "Spanish",
    "Vietnamese"
  ];

  const cuisineFourthRow = [
    "Moroccan",
    "German",
    "Mediterranean"
  ];

  const cuisine = ["Italian", "Japanese", "Chinese", "Indian",
             "Mexican", "Thai", "French", "American",
             "Greek", "Korean", "Spanish", "Vietnamese",
             "Moroccan", "German", "Mediterranean"];



  // Change the button state of diet when pressed
  const toggleDiet = (index: number) => {
    setSelectedDiet((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index]; 
      return newSelected;
    });
  };

  // Change the button state of cuisine when pressed
  const toggleCuisine = (index: number) => {
    setSelectedCuisine((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index]; 
      return newSelected;
    });
  };

  // get the list of selected buttons
  const getSelectedDiet = () => {
    return selectedDiet
      .map((isSelected, index) => isSelected ? index : -1)  // Map true indices to actual index, false to -1
      .filter(index => index !== -1);  // Filter out the -1 values
  };

   // get the list of selected buttons
   const getSelectedCuisine = () => {
    return selectedCuisine
      .map((isSelected, index) => isSelected ? index : -1)  // Map true indices to actual index, false to -1
      .filter(index => index !== -1);  // Filter out the -1 values
  };

  // retrieve allergies selected
  const sendMessage = () => {

    const dietindex = getSelectedDiet();
    const cuisineindex = getSelectedCuisine();

    let dietmessage = dietindex.map(index => diet[index]);
    let cuisinemessage = cuisineindex.map(index => cuisine[index]);
    let message: string[][] = [
        dietmessage, cuisinemessage
    ];
    onMessageSend(message);  // This calls the function passed from the parent
  };

  return (
    <View className="justify-center items-center p-2 ">
        <Text style={styles.modalText}>Diet</Text>
        
        {/* Diet Row 1 */}
        <View className="flex-row flex-wrap justify-center mb-2">
            {dietFirstRow.map((buttonLabel, index) => (
            <SelectionButton
                key={index}
                isSelected={selectedDiet[index]}
                onPress={() => toggleDiet(index)}
                label={buttonLabel}
            />
            ))}
        </View>

        {/* Diet Row 2 */}
        <View className="flex-row flex-wrap justify-center mb-2">
            {dietSecondRow.map((buttonLabel, index) => (
            <SelectionButton
                key={index + 3}
                isSelected={selectedDiet[index + 3]}
                onPress={() => toggleDiet(index + 3)}
                label={buttonLabel}
            />
            ))}
        </View>

        <Text style={styles.modalText}>Cuisines</Text>

        {/* Cuisine Row 1 */}
        <View className="flex-row flex-wrap justify-center mb-2">
            {cuisineFirstRow.map((buttonLabel, index) => (
            <SelectionButton
                key={index}
                isSelected={selectedCuisine[index]}
                onPress={() => toggleCuisine(index)}
                label={buttonLabel}
            />
            ))}
        </View>

        {/* Cuisine Row 2 */}
        <View className="flex-row flex-wrap justify-center mb-2">
            {cuisineSecondRow.map((buttonLabel, index) => (
            <SelectionButton
                key={index + 4}
                isSelected={selectedCuisine[index + 4]}
                onPress={() => toggleCuisine(index + 4)}
                label={buttonLabel}
            />
            ))}
        </View>

        {/* Cuisine Row 3 */}
        <View className="flex-row flex-wrap justify-center mb-2">
            {cuisineThirdRow.map((buttonLabel, index) => (
            <SelectionButton
                key={index + 8}
                isSelected={selectedCuisine[index + 8]}
                onPress={() => toggleCuisine(index + 8)}
                label={buttonLabel}
            />
            ))}
        </View>

        {/* Cuisine Row 4 */}
        <View className="flex-row flex-wrap justify-center mb-2">
            {cuisineFourthRow.map((buttonLabel, index) => (
            <SelectionButton
                key={index + 12}
                isSelected={selectedCuisine[index + 12]}
                onPress={() => toggleCuisine(index + 12)}
                label={buttonLabel}
            />
            ))}
        </View>      

      {/* submit button */}
      <Button title="Save Changes" onPress={sendMessage} />

    </View>

  );
};

export default PreferenceGrid;


const styles = StyleSheet.create({
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
    }
});