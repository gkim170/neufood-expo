// import React, { useState, useEffect } from 'react';
// import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { mockRecipes } from './mockData';
// import BackArrow from '@/components/BackArrow';

// const RecipeDetailScreen = () => {
//   // Get the id that was passed in generated.tsx
//   const { id } = useLocalSearchParams();
//   // Log id for debugging
//   console.log('Recipe ID:', id);

//   const [recipe, setRecipe] = useState(null);
//   const [showIngredients, setShowIngredients] = useState(true); 


//   useEffect(() => {
//     // If id was found, find the recipe from the mockData file 
//     if (id) {
//       const recipeData = mockRecipes.find((recipe) => recipe.id === id);
//       setRecipe(recipeData);
//     }
//   }, [id]);

//   // If recipe hasn't loaded correctly display message
//   if (!recipe) return <Text>Loading...</Text>;

//   // Lists are used at the bottom of the screen
//   const IngredientList = () => (
//     <View>
//       {recipe.ingredients.map((ingredient, index) => (
//         <Text key={index} className="text-base">{ingredient}</Text>
//       ))}
//     </View>
//   );

//   const InstructionList = () => (
//     <View>
//       {recipe.instructions.map((step, index) => (
//         <Text key={index} className="text-base">{`${index + 1}. ${step}`}</Text>
//       ))}
//     </View>
//   );

//   return (
//     <View className="flex-1 bg-custom-background">
//       <BackArrow/>
//       <ScrollView>
//         {/* Image, recipe name, and calories */}
//         <View>
//           <View>
//             <View>
//               <Image source={recipe.image} className="h-half w-full" />
//             </View>
//             <View className="px-5">
//               <Text className="text-2xl font-bold mt-4">{recipe.label}</Text>
//               <Text className="font-primary text-gray-600">Calories: {recipe.calories} kcal</Text>
//             </View>
//           </View>
//         </View>

//         {/* Info titles that you can click between: ingredients and instructions */}
//         <View className="flex-row justify-center items-center gap-10 p-5">
//           {/* Initially ingredients are displayed and can switch to instructions by clicking that button */}
//           <TouchableOpacity onPress={() => setShowIngredients(true)}>
//             <Text className={`font-bold ${showIngredients ? 'text-black' : 'text-gray-600'}`}>
//               Ingredients
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => setShowIngredients(false)}>
//             <Text className={`font-bold ${!showIngredients ? 'text-black' : 'text-gray-600'}`}>
//               Instructions
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Info that will be displayed dependant on the setShowIngredients state */}
//         <View className="px-5">
//           {showIngredients ? (
//               <IngredientList />
//             ) : (
//               <InstructionList />
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default RecipeDetailScreen;


import React, { useEffect, useState } from 'react';
import { Image, Text, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const RecipeDetailScreen = () => {
  const { recipeUri } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null); // Change state to null initially
  const [error, setError] = useState(null);


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
    const roundedCalories = Math.round(recipe.calories);
    return (
    <View>
      <Text>{recipe.label}</Text>
      <Image source={{ uri: recipe.image }} style={{ width: 200, height: 200 }} />
      <Text>Calories: {roundedCalories}</Text>
      <Text>Total Time: {recipe.totalTime} minutes</Text>
      <Text>Ingredients:</Text>
      {recipe.ingredientLines?.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}
    </View>
    );
  }
};

export default RecipeDetailScreen;