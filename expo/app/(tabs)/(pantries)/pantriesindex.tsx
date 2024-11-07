import { View, Text, Image, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import DarkButton from '@/components/DarkButton';
import PantryButton from '@/components/PantryButton';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';

const Pantries = () => {
    // Used to make sure we get here correctly (for testing), can see this log in the terminal
    useEffect(() => {
      console.log('Pantries page rendered');
    }, []);

    //test data constructors to make sure we're pushing the correct types to the array
    type Collaborator = {
      uid: string;
    };
    
    type Ingredient = {
      name: string;
      category: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      purchaseDate: Date;
      expDate: Date;
      imageSource?: any;
    };
    
    type Pantry = {
      pantryId?: string;
      name?: string;
      ownerId?: string;
      collaborators?: Collaborator[];
      ingredients?: Ingredient[];
      imageSource?: any;
    };
    
    // Test data for pantries
    const [pantryData, setPantryData] = useState<Pantry[]>([
      {
        pantryId: "1",
        name: "Pantry 1",
        ownerId: "owner1",
        collaborators: [{ uid: "user2" }, { uid: "user3" }],
        ingredients: [
          {
            name: "Apples",
            category: "Fruit",
            quantity: 10,
            unitPrice: 0.5,
            totalPrice: 5,
            purchaseDate: new Date('2024-01-01'),
            expDate: new Date('2024-01-10'),
            imageSource: Images.fruits,
          },
          {
            name: "Chicken Breast",
            category: "Meat",
            quantity: 5,
            unitPrice: 2.0,
            totalPrice: 10,
            purchaseDate: new Date('2024-01-01'),
            expDate: new Date('2024-01-05'),
            imageSource: Images.protein,
          }
        ],
        imageSource: Images.defaultPantry,
      },
      {
        pantryId: "2",
        name: "Protein Pantry",
        ownerId: "owner2",
        collaborators: [{ uid: "user4" }],
        ingredients: [
          {
            name: "Protein Powder",
            category: "Supplements",
            quantity: 1,
            unitPrice: 20.0,
            totalPrice: 20,
            purchaseDate: new Date('2024-02-01'),
            expDate: new Date('2025-02-01'),
            imageSource: Images.protein,
          }
        ],
        imageSource: Images.protein,
      },
      {
        pantryId: "3",
        name: "Grain Pantry",
        ownerId: "owner3",
        collaborators: [{ uid: "user4" }],
        ingredients: [
          {
            name: "Wheat",
            category: "Grains",
            quantity: 1,
            unitPrice: 20.0,
            totalPrice: 20,
            purchaseDate: new Date('2024-02-01'),
            expDate: new Date('2025-02-01'),
            imageSource: Images.grains,
          },
          {
            name: "Barley",
            category: "Grains",
            quantity: 1,
            unitPrice: 20.0,
            totalPrice: 200000,
            purchaseDate: new Date('2024-02-01'),
            expDate: new Date('2025-02-01'),
            imageSource: Images.grains,
          },
        ],
        imageSource: Images.grains,
      },
    ]);
    // stuff for adding pantry via modal (i like this better than navigating to multiple pages where data can be lost in transfer)
    // State to control modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    const [pantryName, setPantryName] = useState('');
    const [collaboratorInput, setCollaboratorInput] = useState(''); // Temporary input for a single collaborator
    const [collaborators, setCollaborators] = useState<string[]>([]);
    // Function to add collaborator to array
    const addCollaborator = () => {
      if (collaboratorInput.trim()) {
        setCollaborators([...collaborators, collaboratorInput.trim()]);
        setCollaboratorInput(''); // Clear input field after adding
      }
    };
    // Handler for adding ingredients, toggles modal visibility
    const handleAddPantry = () => {
      setModalVisible(true);
    };
      // removes previously added words if the thing is bad and you change your mind
    const handleCancelAdd = () => {
      setModalVisible(false);
      setPantryName('');
      setCollaborators([]);
    };

    // Function to handle adding pantry (e.g., submitting the form) after the user inputs text. 
    const submitPantry = () => {
      //TODO: for connecting to DB, hit route then populate newPantry with that data
      let i = pantryData.length + 1;
      let getId = i.toString(); //we would get this id back from the POST route ideally
      //const imageKey = category.toLowerCase(); // Matches image keys to the correct image in order to use it
      //TODO: enforce some sort of requirement/security check for this
      const newPantry = {
        pantryId: getId,
        name: pantryName,
        ownerId: 'ownerId',
        collaborators: collaborators.map(uid => ({ uid})),
        imageSource: Images.defaultPantry, //.imageKey
      }
      //make sure to post to DB first
      console.log("Adding pantry:", pantryName, collaborators);
      setPantryData([...pantryData, newPantry]);
      // Clear input and close modal
      setPantryName('');
      setCollaborators([]);
      setModalVisible(false);
    };
  
  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      {/*temporarily created modal for handling add pantry instead of pushing a route to a new page since i felt the functionality was cleaner and excessive with that 
      <DarkButton 
        onPress={() => router.push("./addpantry")} 
        title={'Add Pantry'}
        style={{ margin: 15 }}
      />
      */}
      <DarkButton 
        onPress={handleAddPantry} 
        title={'Add Pantry'}
        style={{ margin: 15 }}
      />
      
      {/* Modal popup for adding a new pantry */}
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} //make it seen!
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Add New Pantry</Text>
              {/** Input pantry name */}
              <TextInput
                placeholder="Pantry Name"
                value={pantryName}
                onChangeText={setPantryName}
                style={{ 
                  borderRadius: 8,
                  padding: 8,
                  //marginBottom: 15, //somehow this looks bad with the 15
                  borderWidth: 1, 
                }}
                placeholderTextColor= "#000" // Set the placeholder text color
              />
              {/** input and add collaborators*/}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <TextInput
                  placeholder="Collaborator Id"
                  value={collaboratorInput}
                  onChangeText={setCollaboratorInput}
                  inputMode="email"
                  style={{ 
                    borderRadius: 8,
                    padding: 8,
                    marginBottom: 15,
                    borderWidth: 1, 
                    flex: 1,
                  }}
                  placeholderTextColor= "#000" // Set the placeholder text color
                />
                {/* Add collaborator Button */}
                <TouchableOpacity onPress={addCollaborator} style={{ marginLeft: 20, marginBottom: 15,padding: 8, backgroundColor: Colors.darkerGreen, borderRadius: 5, alignItems: 'center'  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity onPress={submitPantry} style={{ padding: 10, backgroundColor: Colors.darkerGreen, borderRadius: 5, alignItems: 'center'  }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Pantry</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity onPress={() => handleCancelAdd()} style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ color: 'grey' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      <Text></Text>
      {/** DYNAMICALLY POPULATE FOR A LIST OF JSON! */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 15}} className="bg-custom-background">
      {pantryData.map((pantry) => (
        <View key={pantry.pantryId} className="mt-5">{/** tbh dont know why this key is mad here and not anywhere else*/}
          <PantryButton 
            title={pantry.name!} 
            onPress={() => router.push("./individualpantry")} //want to push the individual pantry AND pantry data to the thing I think, but don't know how to logic that (unless default to nothing and then only populate when pantry clicked)
            imageSource={pantry.imageSource} 
          />
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

export default Pantries;
/**
 * Overview of pantries tab:
 * Main pantry tab
 *    Add pantry button at top of subsection layer
 *    Vertical scrolling through existing pantries 
 *    Existing pantries have picture:name
 * (onClick) Add Pantry --> goto create pantry
 *    Create your pantry
 *        input Pantry name
 *        Next button
 *    Add household members as contributors
 *        input contributor emails
 *        next button
 *    Success page
 *        checkmark
 *        your new pantry has been created
 *        go to home pantry subtab 
 *  (onClick) individual pantry from main pantry tab --> goto pantry subtab
 *    pantry subtab
 *        horizontal scrolling bar at top, highlighted on which pantry you're looking at
 *        add ingredient button on top
 *        (onClick) add ingredient --> popup add ingredient
 *            popup add ingredient bubble
 *                item name
 *                total price
 *                category (from list)
 *                expiration date
 *                quantity counter
 *                add button
 *         grid of ingredient cells
 *            favorite
 *            info button
 *                (onclick) info button
 *                    heart
 *                    delete
 *                    total price
 *                    category
 *                    expiration date
 *                    name
 *                    quantity
 *                    "use" turns into edit, which goes to popup UPDATE ingredient bubble
 *            picture
 *            name
 *            quantity
 *            "use" button decrements by 1
 */
