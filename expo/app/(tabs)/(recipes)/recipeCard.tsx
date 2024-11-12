import React, { useState } from 'react';
import { View, Text, Image} from 'react-native';
import FavoriteButton from '../../../components/FavoriteButton.tsx';

const RecipeCard = ({ recipe }) => {
	return (
	// Display the basic recipe info
	<View className="bg-primary-green rounded-lg mb-8 p-2">
		<Image source={{ uri: recipe.images.REGULAR.url }} className="w-full h-40 rounded" />
		<View className="flex-row justify-between items-center px-2">
			<Text className="text-lg font-bold mt-2">{recipe.label}</Text>
			<FavoriteButton />
		</View>
	</View>
	);
};

export default RecipeCard;
