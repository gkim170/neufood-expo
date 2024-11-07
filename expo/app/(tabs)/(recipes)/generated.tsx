import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { mockRecipes } from './mockData';
import RecipeCard from './recipeCard'; // Import the RecipeCard component
import { SafeAreaView } from 'react-native-safe-area-context';

const Generated = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-custom-background px-8">
      {/* List of the recipe cards, using mock data currently */}
      <FlatList
        data={mockRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Generated;


