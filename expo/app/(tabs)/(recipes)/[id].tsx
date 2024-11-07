import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { mockRecipes } from './mockData';
import BackArrow from '@/components/BackArrow';

const RecipeDetailScreen = () => {
  // Get the id that was passed in generated.tsx
  const { id } = useLocalSearchParams();
  // Log id for debugging
  console.log('Recipe ID:', id);

  const [recipe, setRecipe] = useState(null);
  const [showIngredients, setShowIngredients] = useState(true); 


  useEffect(() => {
    // If id was found, find the recipe from the mockData file 
    if (id) {
      const recipeData = mockRecipes.find((recipe) => recipe.id === id);
      setRecipe(recipeData);
    }
  }, [id]);

  // If recipe hasn't loaded correctly display message
  if (!recipe) return <Text>Loading...</Text>;

  // Lists are used at the bottom of the screen
  const IngredientList = () => (
    <View>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} className="text-base">{ingredient}</Text>
      ))}
    </View>
  );

  const InstructionList = () => (
    <View>
      {recipe.instructions.map((step, index) => (
        <Text key={index} className="text-base">{`${index + 1}. ${step}`}</Text>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-custom-background">
      <BackArrow/>
      <ScrollView>
        {/* Image, recipe name, and calories */}
        <View>
          <View>
            <View>
              <Image source={recipe.image} className="h-half w-full" />
            </View>
            <View className="px-5">
              <Text className="text-2xl font-bold mt-4">{recipe.label}</Text>
              <Text className="font-primary text-gray-600">Calories: {recipe.calories} kcal</Text>
            </View>
          </View>
        </View>

        {/* Info titles that you can click between: ingredients and instructions */}
        <View className="flex-row justify-center items-center gap-10 p-5">
          {/* Initially ingredients are displayed and can switch to instructions by clicking that button */}
          <TouchableOpacity onPress={() => setShowIngredients(true)}>
            <Text className={`font-bold ${showIngredients ? 'text-black' : 'text-gray-600'}`}>
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowIngredients(false)}>
            <Text className={`font-bold ${!showIngredients ? 'text-black' : 'text-gray-600'}`}>
              Instructions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info that will be displayed dependant on the setShowIngredients state */}
        <View className="px-5">
          {showIngredients ? (
              <IngredientList />
            ) : (
              <InstructionList />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RecipeDetailScreen;
