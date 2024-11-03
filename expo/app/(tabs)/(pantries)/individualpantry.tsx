import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'
import DarkButton from '@/components/DarkButton';
import BackArrow from '@/components/BackArrow';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';

const IndividualPantry = () => {
  //constructor type beat for ingredient table should be same model as DB (maybe types mismatch)
  type Ingredient = {
    name: string;
    totalPrice: number;
    category: string;
    expirationDate: string;
    quantity: number;
    image: any; // You could use ImageSourcePropType from 'react-native' if you're working with React Native images
  };
  //data for testing!!!
  const [ingredients, setIngredients] = useState<Ingredient[]>([    
    {
    name: "Tomato",
    totalPrice: 10,
    category: "Vegetables",
    expirationDate: "2024-11-15",
    quantity: 5,
    image: Images.vegetables,
    },  
    {
    name: "Steak",
    totalPrice: 10,
    category: "Protein",
    expirationDate: "2024-11-15",
    quantity: 50,
    image: Images.protein,
    },  
    {
    name: "Flour",
    totalPrice: 10,
    category: "Grains",
    expirationDate: "2024-11-15",
    quantity: 500,
    image: Images.grains,
    },  
    {
    name: "Red Pepper Flakes",
    totalPrice: 10,
    category: "Spices",
    expirationDate: "2024-11-15",
    quantity: 5000,
    image: Images.spices,
    },  
  ]);
  //pantries data for testing but currently doesn't get populated from single source.
  //need to GET all pantries where uid = current uid
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

  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Individual pantry page rendered');
  }, []);

  // Handler for adding ingredients
  // State to control modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [category, setCategory] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false); //make sure we see if the category dropdown is open or not
  const [expirationDate, setExpirationDate] = useState('');
  const [quantity, setQuantity] = useState('');

  // Handler for adding ingredients, toggles modal visibility
  const handleAddIngredient = () => {
    setModalVisible(true);
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

  // Function to handle adding ingredient (e.g., submitting the form)
  const submitIngredient = () => {
    const imageKey = category.toLowerCase(); // Matches image keys to the correct image in order to use it
    const newIngredient = {
      name: ingredientName,
      totalPrice: Number(totalPrice),
      category,
      expirationDate,
      quantity: Number(quantity),
      image: Images.other, // need to find a way to make this work with imageKey (Images.imageKey)
    }
    //TODO: MAKE THIS HIT THE ROUTE actually!
    console.log("Adding ingredient:", ingredientName, totalPrice, category, expirationDate, quantity);
    setIngredients([...ingredients, newIngredient]);
    // Clear input and close modal
    setIngredientName('');
    setTotalPrice('');
    setCategory('');
    setExpirationDate('');
    setQuantity('');
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-custom-background p-4">
      <BackArrow />
      <View>
        {/** horizontal scrolling list of pantries populated by pantries data */}
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
                keyboardType="numeric"
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
                placeholder="Expiration Date"
                value={expirationDate}
                onChangeText={setExpirationDate}
                keyboardType="numeric"//need to make sure this formats as a date
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
                keyboardType="numeric"
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
              <TouchableOpacity onPress={() => handleCancelAdd()} style={{ marginTop: 10, alignItems: 'center' }}>
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
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 m-2 rounded-md shadow"
                onPress={() => console.log("Ingredient clicked")}
                style={{ backgroundColor: Colors.primaryPink ,position: 'relative',width:150, }} // Position for the icon
              >
                <Image source={item.image || Images.other} className="w-12 h-12" />
                <Text className="font-bold mt-2">{item.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <Text style={{fontWeight: 'bold', minWidth:10, textAlign: 'left'}}>Q: {item.quantity}</Text>
                  {/* Pill-shaped button for Use */}
                  <TouchableOpacity
                    onPress={() => console.log("Using ingredient")}//should decrement the couter and push to thing
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
            )}
          />
        </View>     
      )}
    </View>
  );
};

export default IndividualPantry;
