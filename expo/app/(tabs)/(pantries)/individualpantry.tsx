import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import DarkButton from '@/components/DarkButton';
import BackArrow from '@/components/BackArrow';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

const IndividualPantry = () => {
  
  //data for testing!!!
  const [ingredients, setIngredients] = useState([    
    {
    name: "Tomato",
    quantity: 5,
    image: Images.vegetables,
    category: "Vegetable",
    expirationDate: "2024-11-15",
  },
  {
    name: "Milk",
    quantity: 1,
    image: Images.dairy,
    category: "Dairy",
    expirationDate: "2024-10-30",
  },
  {
    name: "Eggs",
    quantity: 12,
    image: Images.protein,
    category: "Protein",
    expirationDate: "2024-11-01",
  },
  {
    name: "Bread",
    quantity: 2,
    image: Images.grains,
    category: "Grain",
    expirationDate: "2024-10-29",
  },
  {
    name: "Bread",
    quantity: 2,
    image: Images.grains,
    category: "Grain",
    expirationDate: "2024-10-29",
  },
  {
    name: "Bread",
    quantity: 2,
    image: Images.grains,
    category: "Grain",
    expirationDate: "2024-10-29",
  },
  {
    name: "Bread",
    quantity: 2,
    image: Images.grains,
    category: "Grain",
    expirationDate: "2024-10-29",
  },
  {
    name: "Bread",
    quantity: 2,
    image: Images.grains,
    category: "Grain",
    expirationDate: "2024-10-29",
  },
  {
    name: "Bread",
    quantity: 2,
    image: Images.grains,
    category: "Grain",
    expirationDate: "2024-10-29",
  },]);
  const [pantries, setPantries] = useState([    
    { id: 1, name: 'Pantry A' },
    { id: 2, name: 'Pantry B' },
    { id: 3, name: 'Pantry C' },  
    { id: 4, name: 'Pantry D' },  
    { id: 5, name: 'Pantry E' },  
    { id: 6, name: 'Pantry F' },  
    { id: 7, name: 'Pantry G' },  
    { id: 8, name: 'Pantry H' },  
  ]);
  const [selectedPantry, setSelectedPantry] = useState<number | null>(null);

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
      <View>
        <FlatList
          style={{marginLeft: 50}}
          horizontal
          data={pantries}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedPantry(item.id )}
              style={{
                padding: 10,
                backgroundColor: selectedPantry === item.id ? Colors.darkGreen : Colors.primaryGreen,
                //not actually the thing but textColor: selectedPantry === item.id ? Colors.white : Colors.black,
                marginRight: 10,
                marginLeft: 5,
                marginTop: 20,
                borderRadius: 5,
                height: 65,
                width: 120,
                alignItems: 'center',
              }}
            >
              <Text style={{ justifyContent: 'center', fontSize: 20, color: selectedPantry === item.id ? '#FFF' : '#000' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 10 }} // Optional: Add padding at the bottom
        />
        {/* Add Ingredient Button */}
        <DarkButton 
        style={{marginTop: 10, marginLeft: 50, justifyContent: 'center'}}//not good practice, want to center but it's not working tbh
        onPress={handleAddIngredient} 
        title="Add Ingredient" />
      </View>

      {ingredients.length === 0 ? (//
        // No ingredients view
        <View className="items-center mt-5">
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

          {/* Ingredient Grid (flatlist is scrollable!) */}
          <FlatList
            data={ingredients}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 215 }}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2} // Set to two columns
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 m-2 rounded-md shadow"
                onPress={() => console.log("Ingredient clicked")}
                style={{ backgroundColor: Colors.primaryPink ,position: 'relative',width:150, }} // Position for the icon
              >
                <Image source={item.image || Images.other} className="w-12 h-12" />
                <Text className="font-bold mt-2">{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{fontWeight: 'bold'}}>Q: {item.quantity}</Text>
                  {/* Pill-shaped button for Use */}
                  <TouchableOpacity
                    onPress={() => console.log("Using ingredient")}
                    style={{
                      backgroundColor: '#FFF', // Change to your desired color
                      borderRadius: 20, // Pill shape
                      paddingVertical: 5,
                      marginLeft: 35,
                      paddingHorizontal: 20,
                      alignSelf: 'flex-start', // Align left or adjust as needed
                    }}
                  >
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Use</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Info Icon for Details */}
                <TouchableOpacity
                  onPress={() => console.log("Flipping to details")}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                >
                  <Image
                    source={Images.infoIcon} // Replace with your actual icon path
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>     
      )}
    </View>
  );
};

export default IndividualPantry;
