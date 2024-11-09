import { View, Text, Image, FlatList, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import DarkButton from '@/components/DarkButton';
import PantryButton from '@/components/PantryButton';
import RecipesPantryButton from '@/components/RecipesPantryButton';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import axios, { AxiosError } from 'axios';

const UID = "333";
const url = process.env.EXPO_PUBLIC_API_URL;

interface ErrorResponse {
  message: string;
}

interface PantryDetails {
  pantryId: string;
  pantryName: string;
}

const Pantries = () => {
    const [pantries, setPantries] = useState<PantryDetails[]>([]);
    const [selectedPantryId, setSelectedPantryId] = useState<string | null>(null); // State to keep track of selected pantry, there can only be one and you have to pick one

    // Used to make sure we get here correctly (for testing), can see this log in the terminal
    useEffect(() => {
      console.log('Pantries page rendered');
      pantryListRetriever();
    }, []);

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

  //database connection (thanks rory)
  // Get the list of pantries from the user's pantry array using uid, which is currently hardcoded as 333
  const pantryListRetriever = async () => {
    try {
      // Send the get request to the database to get pantry ids
      // Have to replace the constant UID with the user's actual ID eventually
      const response = await axios.get(`${url}/users/${UID}/retrievePantries`, {
        timeout: 10000,
      });
      const pantryIds = response.data;
      console.log("Pantry IDs:", pantryIds);
      
      // Get the pantry names from the retrievePantryDetails function
      const pantryDetails = await retrievePantryDetails(pantryIds);
      console.log("Pantry Details:", pantryDetails);
      
      // Set the pantry state to the details we received, the ids and name
      setPantries(pantryDetails);
      console.log('Pantries retrieved');
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
        const { pantryId: id, name } = response.data;
        return { pantryId: id, pantryName: name };
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


  return (
    <View className="flex-1 justify-center items-center bg-custom-background">      
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
      {pantries.map((pantry) => (
        <View key={pantry.pantryId} className="mt-5">{/** tbh dont know why this key is mad here and not anywhere else*/}
          <PantryButton 
            title={pantry.pantryName!} 
            onPress={() => router.push("./individualpantry")} //want to push the individual pantry AND pantry data to the thing I think, but don't know how to logic that (unless default to nothing and then only populate when pantry clicked)
            imageSource={Images.defaultPantry} 
          />
        </View>
      ))}
    </ScrollView>
    </View>
  );
};

export default Pantries;
/**
 * 
 * 
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
