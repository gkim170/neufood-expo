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

  return (
    <View className="flex-1 bg-custom-background p-4">
      <BackArrow />
      
      <Text className="font-bold text-2xl my-4 text-center">INDIVIDUAL PANTRY!</Text>

      {/* Add Ingredient Button */}
      <DarkButton onPress={handleAddIngredient} title="Add Ingredient" />

      {ingredients.length === 0 ? (
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
            className="bg-white rounded-md p-2 mb-4"
          />

          {/* Ingredient Grid */}
          <ScrollView horizontal>
            {ingredients.map((ingredient, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white p-4 m-2 rounded-md shadow"
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

      {/* Back Button to Pantries Index */}
      <DarkButton
        onPress={() => router.push('./pantriesindex')}
        title="Back to Pantries"
      />
    </View>
  );
};

export default Success;
