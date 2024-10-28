import { View, Text, Image } from 'react-native';

const RecipeCard = ({ recipe }) => {
  return (
    // Display the basic recipe info
    <View className="bg-primary-green rounded-lg mb-8 p-2">
        <Image source={recipe.image} className="w-full h-40 rounded" />
        <Text className="text-lg font-bold mt-2">{recipe.label}</Text>
        {/* <Text className="text-gray-700 font-primary">{recipe.id}</Text> */}
    </View>
  );
};

export default RecipeCard;
