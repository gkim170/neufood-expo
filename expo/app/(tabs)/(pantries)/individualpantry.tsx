import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import DarkButton from '@/components/DarkButton';
import BackArrow from '@/components/BackArrow';
import Images from '@/constants/images';
import { router } from 'expo-router';

const Success = () => {
  const [ingredients, setIngredients] = useState([]);

  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Individual pantry page rendered');
  }, []);

  // Handler for adding ingredients
  const handleAddIngredient = () => {
    // Logic to add an ingredient, e.g., opening a modal or form
  };

  //random pantries
  const pantries = [
    { id: 1, name: 'Pantry A' },
    { id: 2, name: 'Pantry B' },
    { id: 3, name: 'Pantry C' },
    // Add more pantry objects as needed
  ];
  //random ingredients thing etc.
  let ingredients2 = [
    {
      name: "Tomato",
      quantity: 5,
      image: Images.other,
      category: "Vegetable",
      expirationDate: "2024-11-15",
    },
    {
      name: "Milk",
      quantity: 1,
      image: Images.other,
      category: "Dairy",
      expirationDate: "2024-10-30",
    },
    {
      name: "Eggs",
      quantity: 12,
      image: Images.other,
      category: "Protein",
      expirationDate: "2024-11-01",
    },
    {
      name: "Bread",
      quantity: 2,
      image: Images.other,
      category: "Grain",
      expirationDate: "2024-10-29",
    },
  ];

  return (
    <View className="flex-1 bg-custom-background p-4">
      <BackArrow />
        <ScrollView horizontal>
        
        </ScrollView>
      

      {/* Add Ingredient Button */}
      <DarkButton 
      style={{marginTop: 10, marginLeft: 50, justifyContent: 'center'}}//not good practice, want to center but it's not working tbh
      onPress={handleAddIngredient} title="Add Ingredient" />


      {ingredients2.length === 0 ? (//
        // No ingredients view
        <View className="items-center mt-6">
          <Text className="text-lg">No Ingredients</Text>
          <Text className="text-center mt-2">Add ingredients manually or scan your grocery receipt</Text>
          <View className="arrow-pointing-down" />
        </View>
      ) : (
        // Ingredients view
        <View className="mt-4">
          {/* Search bar */}
          <TextInput
            placeholder="Search ingredients..."
            className="text-black bg-white rounded-md p-2 mb-4 border-gray-300"
            style={{
              color: 'black', // Set text color
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: 'gray', // or use the appropriate color
            }}
          />

          {/* Ingredient Grid */}
          <ScrollView>
            {ingredients2.map((ingredient, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white p-4 m-2 rounded-md shadow "
                onPress={() => console.log('Ingredient clicked')}
              >
                <Image source={{ uri: Images.other }} className="w-12 h-12" />
                <Text className="font-bold mt-2">{"Other"}</Text>
                <Text>Quantity: {10}</Text>
                <TouchableOpacity onPress={() => console.log('Flipping to details')}>
                  <Text className="mt-2 text-blue-500">Details</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Success;
