import { View, Text, Image, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import DarkButton from '@/components/DarkButton';
import { Dropdown } from 'react-native-element-dropdown'
import PantryButton from '@/components/PantryButton';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import axios, { AxiosError } from 'axios';

const UID = "user-1729689547676"; //for me aka long thor :)
const url = process.env.EXPO_PUBLIC_API_URL;

interface ErrorResponse {
  message: string;
}

interface PantryDetails {
  pantryId: string;
  pantryName: string;
  imageSource: string;
}
const pantryimages = [
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Dorm', value: 'Dorm' },
  { label: 'House', value: 'House' },
  { label: 'Office', value: 'Office' },
  { label: 'Office2', value: 'Office2' },
];
type PantryKeys =  'apartment' | 'dorm' | 'house' | 'office' | 'office2';

const Pantries = () => {
    // stuff for adding pantry via modal (i like this better than navigating to multiple pages where data can be lost in transfer)
    // State to control modal visibility
    const [modalVisible, setModalVisible] = useState(false);
    const [pantryName, setPantryName] = useState('');
    const [collaboratorInput, setCollaboratorInput] = useState(''); // Temporary input for a single collaborator
    const [collaborators, setCollaborators] = useState<string[]>([]);
    const [pantries, setPantries] = useState<PantryDetails[]>([]);
    const [pantryImagesOpen, setPantryImagesOpen] = useState(false);
    const [pantryImage, setPantryImage] = useState('');

    // Used to make sure we get here correctly (for testing), can see this log in the terminal
    useEffect(() => {
      console.log('Pantries page rendered');
      pantryListRetriever();
    }, []);

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
      setPantryImage('');
      setCollaborators([]);
    };

    // Function to handle adding pantry (e.g., submitting the form) after the user inputs text. 
    // Function to handle creating a new pantry
  const createPantry = async (pantryName: string, UID: string, pantryImage: string) => {
    try {
      // Create a new pantry object
      const newPantry = {
        name: pantryName,
        ownerId: UID, // Replace with actual ownerId from session or user context eventually
        imageSource: pantryImage, // OKAY
      };
      console.log(newPantry);

      // Post the new pantry data to the backend API
      const pantryResponse = await axios.post(`${url}/pantries/`, newPantry);
      const retrievedPantry = pantryResponse.data;

      return retrievedPantry; // Return the pantry data for further use
    } catch (error) {
      console.error("Error during pantry creation:", error);
      throw new Error('There was an error creating the pantry. Please try again.');
    }
  };

  // Function to handle adding collaborators to the pantry
  const addCollaborators = async (pantryId: any, collaborators: any[]) => {
    try {
      if (collaborators && collaborators.length > 0) {
        const collaboratorPayload = { collaborators: collaborators.map(collaborator => ({ uid: collaborator })) };

        // Send request to add collaborators to the pantry
        const collaboratorResponse = await axios.put(
          `${url}/pantries/${pantryId}/addCollaborators`,
          collaboratorPayload
        );
      }
    } catch (error) {
      console.error("Error during adding collaborators:", error);
      throw new Error('There was an error adding collaborators. Please try again.');
    }
  };

  // Function to handle submitting the pantry (e.g., submitting the form)
  const submitPantry = async () => {
    try {
      // Step 1: Create the new pantry
      console.log(pantryImage);
      const retrievedPantry = await createPantry(pantryName, UID, pantryImage);

      // Step 2: Add collaborators to the pantry if they exist
      if (retrievedPantry) {
        await addCollaborators(retrievedPantry.pantryId, collaborators);
      }

      // Step 3: Call to repopulate pantry list based on UID
      await pantryListRetriever();

      // Step 4: Clear input and close modal
      handleCancelAdd();

    } catch (error) {
      console.error("Error during pantry submission:", error);
      alert('There was an error creating the pantry or adding collaborators. Please try again.');
      //Clear input and close modal
      setPantryName('');
      setCollaborators([]);
      setModalVisible(false);
    }
  };

  //database connection (thanks rory)
  // Get the list of pantries from the user's pantry array using uid, which is currently hardcoded as long thor's
  const pantryListRetriever = async () => {
    try {
      // Send the get request to the database to get pantry ids
      // Have to replace the constant UID with the user's actual ID eventually
      const response = await axios.get(`${url}/users/${UID}/retrievePantries`);
      const pantryIds = response.data;
      
      // Get the pantry names from the retrievePantryDetails function
      const pantryDetails = await retrievePantryDetails(pantryIds);
      
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
        const { pantryId: id, name, imageSource } = response.data;
        return { pantryId: id, pantryName: name, imageSource: imageSource };
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
              <Dropdown
                style={{
                  borderRadius: 8,
                  padding: 8,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: '#000',
                }}
                placeholderStyle={{ color: '#000', fontSize: 14 }}
                selectedTextStyle={{ color: '#000', fontSize: 14 }}
                data={pantryimages}
                labelField="label"
                valueField="value"
                placeholder="Location"
                value={pantryImage}
                onFocus={() => setPantryImagesOpen(true)}
                onBlur={() => setPantryImagesOpen(false)}
                onChange={item => {
                  setPantryImage(item.value);
                  setPantryImagesOpen(false);
                }}
                maxHeight={200} // Set a maximum height if you have many items
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
      {pantries.map((pantry) => {
        // Ensure pantryKey matches a valid key in the Images object
        const pantryKey = pantry.imageSource?.toLowerCase() as PantryKeys; // Assume pantry.category holds the category

        return (
          <View key={pantry.pantryId} className="mt-5">
            <PantryButton 
              title={pantry.pantryName!} 
              onPress={() => router.navigate(`./individualpantry?pantryId=${pantry.pantryId}`)}
              imageSource={Images[pantryKey] || Images.other} // Fix syntax issue here
            />
          </View>
        );
      })}
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
