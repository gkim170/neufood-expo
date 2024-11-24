import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoriteButton from '@/components/FavoriteButton';
import RecipeCard from './recipeCard';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';


const Generated = () => {
  const router = useRouter();
  const { pantryId } = useLocalSearchParams(); // get the selected pantry id from 
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('balanced');  // there are other options for things to filter edamam api request by, look at edamam documentation to see
  const url = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const getIngredients = async () => {
      if (pantryId){
        try {
          const response = await fetch(`${url}/pantries/${pantryId}`);  // Get info from pantry by pantryID
          const pantry = await response.json();
      
          // put ingredients in format needed to pass into the edamam api request
          const formattedIngredients = pantry.ingredients
          .map((ingredient: { name: string }) => encodeURIComponent(ingredient.name)) // Encode each ingredient
          .join('%2C%20'); // Join with "%2C%20" (comma and space)
    
          console.log('Ingredient Names:', formattedIngredients);
          setQuery(formattedIngredients); // set the query to the ingredients
          setRecipes([]); // reset recipes
        } catch (error) {
          console.error('Error fetching pantry ingredients:', error);
        }
      }
    };

    getIngredients();
  }, [pantryId]);


  // Make sure EXPO_PUBLIC_EDAMAM_APP_ID and EXPO_PUBLIC_EDAMAM_APP_KEY are defined as strings in .env that's in the root of the project
  const getRecipesSearchRequestURL = (query: string, diet: string) => {
    const id = process.env.EXPO_PUBLIC_EDAMAM_APP_ID;
    const key = process.env.EXPO_PUBLIC_EDAMAM_APP_KEY;
    return `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${id}&app_key=${key}&diet=${diet}&imageSize=REGULAR&field=uri&field=label&field=image&field=images&field=source&field=url&field=ingredientLines&field=calories&field=totalTime`;
  };

   // useEffect hook to fetch recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
      if (query && diet){
        try {
          const response = await fetch(getRecipesSearchRequestURL(query, diet)); // Make the API request using the constructed URL with query and diet parameters
          const data = await response.json(); // Parse the JSON response from the API
          console.log("Edamam API Response:", data); // Logging the response for development purposes
          setRecipes(data.hits.map(hit => hit.recipe)); // If the request is successful, update the state with the fetched recipes
        } catch (error) {
          // If there is an error, log it for testing purposes
          console.error("Error fetching response:", error);
          setError(error);
        }
      }
    };
    // Call the fetch function when the query or diet changes
    fetchRecipes();
  }, [query, diet]); 

  // If there's an error, display a message on the page for the user
  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-custom-background px-8">
        <Text className="text-lg font-bold mt-2">
          Recipes not found
        </Text>
      </View>
    );
  }

  const handleRecipePress = (recipe) => {
    router.push({
      pathname: `/${recipe.uri.split('#')[1]}`,  // Use end of uri as the id
      params: {
        recipeUri: recipe.uri,  // Pass the entire recipe object
      }
    });
  };

  // Render the list of recipes once they're successfully fetched
  return (
    <SafeAreaView className="flex-1 bg-custom-background px-8">
      {/* Display the recipes in a FlatList */}
      <FlatList
        data={recipes}
        keyExtractor={(recipe) => recipe.uri}  // Use recipe URI as the unique key
        renderItem={({ item: recipe }) => (
          <TouchableOpacity onPress={() => handleRecipePress(recipe)}>
            <RecipeCard recipe={recipe} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Generated;
