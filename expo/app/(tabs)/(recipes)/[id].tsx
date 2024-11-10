import React, { useEffect, useState } from 'react';
import { Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import BackArrow from '@/components/BackArrow';

const RecipeDetailScreen = () => {
  const { recipeUri } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null); // Change state to null initially
  const [error, setError] = useState(null);
  const [showIngredients, setShowIngredients] = useState(true); 


  // Make sure EXPO_PUBLIC_EDAMAM_APP_ID and EXPO_PUBLIC_EDAMAM_APP_KEY are defined as strings in .env that's in the root of the project
  const getRecipesSearchRequestURL = () => {
    const id = process.env.EXPO_PUBLIC_EDAMAM_APP_ID;
    const key = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY;
    const encodedRecipeUri = encodeURIComponent(recipeUri);
    console.log('URI', encodedRecipeUri);
    return `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedRecipeUri}&app_id=${id}&app_key=${key}`;
  };

    // useEffect hook to fetch recipes from the API
    useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(getRecipesSearchRequestURL()); // Make the API request using the constructed URL 
        const data = await response.json(); // Parse the JSON response from the API
        console.log('Recipe Data:', data); // Logging the response for development purposes
        setRecipe(data.hits[0]?.recipe); // Access the first (and assuming only) recipe and the array
      } catch (error) {
        // If there is an error, log it for testing purposes
        console.error("Error fetching response:", error);
        setError(error);
      } 
    };
    // Call the fetch function when the query or diet changes
    fetchRecipes();
  }, []);
  

  // If there's an error, display a message on the page for the user
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-custom-background px-8">
        <Text className="text-lg font-bold mt-2">
          Recipe details not found
        </Text>
      </View>
    );
  }


  if (!recipe) {
    return <Text>No recipe found</Text>;
  }
  else {
    // Lists are used at the bottom of the screen
    const IngredientList = () => (
      <View>
        {recipe.ingredientLines?.map((ingredient, index) => (
          <View className="p-1"> 
            <Text key={index}>{ingredient}</Text>
          </View>
        ))}
      </View>
    );
    
    // This doesn't have anything in it yet, need to grab more data
    const RecipeNutrition = () => (
      <View>
        <Text>Nutrients</Text>
      </View>
    );

    const roundedCalories = Math.round(recipe.calories);

    return (
      <View className="flex-1 bg-custom-background">
        <BackArrow/>
        <ScrollView>
          {/* Image, recipe name, and calories */}
          <View>
            <View>
              <View>
              <Image
                source={{ uri: recipe.image }}
                style={{ width: '100%', height: 250 }} 
                resizeMode="cover" // Ensure the image scales properly
              />
              </View>
              <View className="px-5">
                <Text className="text-2xl font-bold mt-4">{recipe.label}</Text>
                <Text className="font-primary text-gray-600">Calories: {roundedCalories} kcal</Text>
                <Text className="font-primary text-gray-600">Total Time: {recipe.totalTime} minutes</Text>
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
                Recipe Nutrition
              </Text>
            </TouchableOpacity>
          </View>

          {/* Info that will be displayed dependant on the setShowIngredients state */}
          <View className="px-5">
            {showIngredients ? (
                <IngredientList />
              ) : (
                <RecipeNutrition />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default RecipeDetailScreen;