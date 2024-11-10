import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'
import DarkButton from '@/components/DarkButton';
import BackArrow from '@/components/BackArrow';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import axios, { AxiosError } from 'axios';
import { useLocalSearchParams } from 'expo-router';

const UID = "user-1729689547676"; //for me aka long thor :)
const url = process.env.EXPO_PUBLIC_API_URL_HOME;
//const url = process.env.EXPO_PUBLIC_API_URL_LEHIGH;

interface ErrorResponse {
  message: string;
}

interface Ingredient {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purchaseDate: string; // ISO string for the purchase date
  expDate: string; // ISO string for the expiration date
  _id: string;
  __v: number;
}

interface Collaborator {
  // Define the structure of a collaborator if needed
  // Example: { userId: string, userName: string }
  [key: string]: any;
}

interface PantryDetails {
  _id: string; // MongoDB unique ID for the pantry
  pantryId: string; // The unique ID for the pantry
  name: string; // The name of the pantry
  ownerId: string; // The owner ID of the pantry
  collaborators: Collaborator[]; // List of collaborators
  ingredients: Ingredient[]; // List of ingredients in the pantry
  __v: number; // MongoDB version key
}

const categories = [
  { label: 'Dairy', value: 'Dairy' },
  { label: 'Fruits', value: 'Fruits' },
  { label: 'Vegetables', value: 'Vegetables' },
  { label: 'Grains', value: 'Grains' },
  { label: 'Protein', value: 'Protein' },
  { label: 'Oils', value: 'Oils' },
  { label: 'Condiments', value: 'Condiments' },
  { label: 'Snacks', value: 'Snacks' },
  { label: 'Desserts', value: 'Desserts' },
  { label: 'Drinks', value: 'Drinks' },
  { label: 'Spices', value: 'Spices' },
  { label: 'Spreads', value: 'Spreads' },
  { label: 'Other', value: 'Other' },
];

type ImageKeys =  'protein' | 'dairy' | 'fruits' | 'vegetables' | 'grains' | 'protein' | 'oils' | 'condiments' | 'snacks' | 'desserts' | 'drinks' | 'spices' | 'spreads' | 'other';

const IndividualPantry = () => {
  // State to control modal visibility and other components within handlers
  const [pantries, setPantries] = useState<PantryDetails[]>([]);
  const [selectedPantryId, setSelectedPantryId] = useState<string | undefined>(undefined); // Set default selected pantry to be NONE
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const selectedPantry = pantries.find((pantry) => pantry.pantryId === selectedPantryId);
  const ingredients = (selectedPantry?.ingredients ?? []) as Ingredient[];
  const { pantryId } = useLocalSearchParams();

  // Used to make sure we get here correctly (for testing, as well as initializes the pantry data), can see this log in the terminal
  useEffect(() => {
    console.log('Individual pantry page rendered');
    pantryListRetriever();
  }, []);

  useEffect(() => {
    // Ensure pantryId is a string (handle case where it might be an array of strings)
    if (Array.isArray(pantryId)) {
      setSelectedPantryId(pantryId[0]); // Use the first element if pantryId is an array
    } else if (typeof pantryId === 'string') {
      setSelectedPantryId(pantryId); // Set the pantryId if it's a single string
    }
  }, [pantryId]); // Run when pantryId changes

  //gets the list of pantries from the uid
  const pantryListRetriever = async () => {
    try {
      // Send the get request to the database to get pantry ids
      // Have to replace the constant UID with the user's actual ID eventually
      const response = await axios.get(`${url}/users/${UID}/retrievePantries`);
      const pantryIds = response.data;
      
      // Get the pantry names from the retrievePantryDetails function
      const pantryDetails = await retrievePantryDetails(pantryIds);
      
      // Set the pantry state to the details we received, the ids and name and all other things!
      setPantries(pantryDetails);
      console.log('Pantries retrieved', pantryDetails);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponse;
        console.error('Error retrieving pantries.', errorData.message);
      } else {
        console.error('Error retrieving pantries.', axiosError.message);
      }
    }
  };

  // Get the name from each pantry using their pantryIds
  const retrievePantryDetails = async (pantryIds: string[]): Promise<PantryDetails[]> => {
    try {
      const pantryRequests = pantryIds.map(async (pantryId) => {
        const response = await axios.get(`${url}/pantries/${pantryId}`);
        return response.data;
      });
      
      return await Promise.all(pantryRequests);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const errorData = axiosError.response.data as ErrorResponse;
        console.error('Error retrieving individual pantry details.', errorData.message);
      } else {
        console.error('Error retrieving individual pantry details.', axiosError.message);
      }
      return [];
    }
  };

  // Function to handle adding ingredient (e.g., submitting the form)
  const submitIngredient = async () => {
    //make sure that expiration date is in the correct format

    const isValidDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(expirationDate);

    if (!isValidDate) {
      alert('Invalid date format. Please use YYYY-MM-DD.');
      return;
    }
    const newIngredient = {
      name: ingredientName,
      totalPrice: Number(totalPrice),
      category,
      expirationDate,
      quantity: Number(quantity),
    };
  
    console.log("Adding ingredient:", newIngredient);
  
    // Make the PUT request to the backend
    try {
      const response = await axios.put(
        `${url}/pantries/${selectedPantryId}/addIngredients`, // Make sure the URL is correct
        { ingredients: [newIngredient] }
      );
      
      console.log("Ingredients added to pantry:", response.data);
  
      // Call pantrylistretriever again to show the updated ingredient stuff
      pantryListRetriever();
      handleCancelAdd(); // Close the form/modal and wipe the states
    } catch (error) {
      console.error("Error adding ingredient:", error);
      alert('There was an error adding the ingredient. Please try again.');
    }
  };

  // Handler for adding ingredients, toggles modal visibility
  const handleAddIngredient = () => {
    setModalVisible(true);
  };
/**
 * 
 * @param ingredient 
 * // DELETE route to delete ingredient(s) from a pantry
//      takes in array of ingredient names (ex. ingredientNames = ["9999", "Cashew"]; )
router.delete('/:pantryId/deleteIngredients', async (req, res) => {
    try {
/*
curl -X DELETE -H "Content-Type: application/json" -d '{
    "ingredientNames": ["9999", "Cashew"]
}' http://localhost:8080/pantries/4/deleteIngredients
*/
const handleUse = async (ingredient: Ingredient) => {
  // If quantity is zero or less, delete the ingredient from the pantry
  if (ingredient.quantity <= 0) {
      try {
          console.log("Deleting ingredient:", ingredient.name);
          await axios.delete(
              `${url}/pantries/${selectedPantryId}/deleteIngredients`, 
              { data: { ingredientNames: [ingredient.name] } }
          );
          console.log("Ingredient deleted successfully.");
          pantryListRetriever(); // Refresh pantry list
          return; // Exit function to prevent further modification
      } catch (error) {
          console.error("Error deleting ingredient:", error);
          return; // Exit function to avoid modification attempt
      }
  }

  // If quantity is greater than zero, decrement it
  const modifiedIngredient = { ...ingredient, quantity: ingredient.quantity - 1 };
  
  try {
      await axios.put(
          `${url}/pantries/${selectedPantryId}/modifyIngredient`,
          {data: { modifiedIngredient } }
      );
      console.log("Ingredient quantity decremented successfully.");
      pantryListRetriever();
  } catch (error) {
      console.error("Error updating ingredient:", error);
  }
};

  // removes previously added words if the thing is bad and you change your mind
  const handleCancelAdd = () => {
    setModalVisible(false);
    setIngredientName('');
    setTotalPrice('');
    setCategory('');
    setExpirationDate('');
    setQuantity('');
  };

  return (
    <View className="flex-1 bg-custom-background p-4">
      <BackArrow />
      <View>
        {/** horizontal scrolling list of pantries populated by pantries data */}
        <FlatList<PantryDetails>
        style={{ marginLeft: 50 }}
        horizontal
        data={pantries}
        keyExtractor={(item: PantryDetails) => item.pantryId!}
        showsHorizontalScrollIndicator={true}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedPantryId(item.pantryId!)}
            style={{
              padding: 10,
              backgroundColor: selectedPantryId === item.pantryId ? Colors.darkGreen : Colors.primaryGreen,
              marginRight: 10,
              marginLeft: 5,
              marginTop: 20,
              borderRadius: 5,
              height: 50,
              minWidth: 150,
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Text style={{ justifyContent: 'center', fontSize: 20, color: selectedPantryId === item.pantryId ? '#FFF' : '#000' }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
        {/* Add Ingredient Button */}
        <DarkButton 
          style={{marginTop: 10, marginLeft: 50, justifyContent: 'center'}}
          onPress={handleAddIngredient} //go into handling adding ingredient with the modal popup below
          title="Add Ingredient" 
        />
        {/* Modal for adding ingredients */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ width: 300, padding: 20, backgroundColor: Colors.primaryPink, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Add New Ingredient</Text>
              {/** sets the info from each of the inputs and makes the variables able to be read by the submission handler thing*/}
              <TextInput
                placeholder="Ingredient Name"
                value={ingredientName}
                onChangeText={setIngredientName}
                style={{ 
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 15,
                  borderWidth: 1, 
                }}
                placeholderTextColor= "#000" // Set the placeholder text color
              />
              <TextInput
                placeholder="Total Price"
                value={totalPrice}
                onChangeText={setTotalPrice}
                style={{ 
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 15,
                  borderWidth: 1, 
                }}
                placeholderTextColor= "#000" // Set the placeholder text color
              />
              <Dropdown
                style={{
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 15,
                  borderWidth: 1,
                  borderColor: '#000',
                  backgroundColor: Colors.primaryPink,
                }}
                placeholderStyle={{ color: '#000', fontSize: 14 }}
                selectedTextStyle={{ color: '#000', fontSize: 14 }}
                data={categories}
                labelField="label"
                valueField="value"
                placeholder="Category"
                value={category}
                onFocus={() => setCategoryOpen(true)}
                onBlur={() => setCategoryOpen(false)}
                onChange={item => {
                  setCategory(item.value);
                  setCategoryOpen(false);
                }}
                maxHeight={200} // Set a maximum height if you have many items
              />
              <TextInput
                placeholder="Expiration Date (Fmt: 2024-12-31)"
                value={expirationDate}
                onChangeText={setExpirationDate}
                
                style={{ 
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 15,
                  borderWidth: 1, 
                }}
                placeholderTextColor= "#000" // Set the placeholder text color
              />
              <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                style={{ 
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 15,
                  borderWidth: 1, 
                }}
                placeholderTextColor= "#000" // Set the placeholder text color
              />
              
              {/* Submit Button (handler)*/}
              <TouchableOpacity onPress={submitIngredient} style={{ padding: 10, backgroundColor: Colors.darkerGreen, borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Ingredient</Text>
              </TouchableOpacity>

              {/* Close Button (and reset the fields)*/}
              <TouchableOpacity onPress={handleCancelAdd} style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: 'grey' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/** if there's no ingredients we tell them to add some, if not we can add the grid view of ingredients */}
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
          {/* Search bar needs to function tho*/}
          <TextInput
            placeholder="Search ingredients..."
            className="text-black bg-white rounded-md p-2 mb-4 border-gray-300"
            placeholderTextColor= "#000" // Set the placeholder text color
            style={{
              color: 'black', // Set text color
              backgroundColor: 'white',
              borderRadius: 8,
              padding: 8,
              marginBottom: 15,
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
            renderItem={({ item }) => {
              // Map category to image
              const categoryKey = item.category.toLowerCase() as ImageKeys;
              const imageSource = Images[categoryKey] || Images.other; // Fallback to 'other' if no match
                
              return(
              <TouchableOpacity
                className="p-4 m-2 rounded-md shadow"
                onPress={() => console.log("Ingredient clicked")}
                style={{ backgroundColor: Colors.primaryPink, position: 'relative', width: 150 }} // Position for the icon
              >
                {/* Dynamic image sourcing based on category */}
                <Image 
                  source={imageSource || Images.other} 
                  className="w-12 h-12" 
                />
                <Text className="font-bold mt-2">{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{ fontWeight: 'bold', minWidth: 10, textAlign: 'left' }}>
                    Q: {item.quantity}
                  </Text>
                  {/* Pill-shaped button for Use */}
                  <TouchableOpacity
                    onPress={() => {handleUse(item)}} // Should decrement the counter and push to thing
                    style={{
                      backgroundColor: '#FFF', // Change to your desired color
                      borderRadius: 20, // Pill shape
                      paddingVertical: 5,
                      marginLeft: 10,
                      paddingHorizontal: 15,
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
            )}}
          />
        </View>     
      )}
    </View>
  );
};

export default IndividualPantry;
