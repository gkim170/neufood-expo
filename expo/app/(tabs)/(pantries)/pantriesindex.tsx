import { View, Text, Image, Modal, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import DarkButton from '@/components/DarkButton';
import { Dropdown } from 'react-native-element-dropdown';
import PantryButton from '@/components/PantryButton';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import axios, { AxiosError } from 'axios';
import { useAuth } from '@/components/AuthContext'; // Import the AuthContext

const url = process.env.EXPO_PUBLIC_API_URL;

interface ErrorResponse {
  message: string;
}

interface PantryDetails {
  pantryId: string;
  pantryName: string;
  imageSource: string;
}

const pantryImages = [
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Dorm', value: 'Dorm' },
  { label: 'House', value: 'House' },
  { label: 'Office', value: 'Office' },
  { label: 'Office2', value: 'Office2' },
];
type PantryKeys = 'Apartment' | 'Dorm' | 'House' | 'Office' | 'Office2';

const Pantries = () => {
  const { uid } = useAuth(); // Pull the UID dynamically from AuthContext
  const [modalVisible, setModalVisible] = useState(false);
  const [pantryName, setPantryName] = useState('');
  const [collaboratorInput, setCollaboratorInput] = useState(''); // Temporary input for a single collaborator
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [pantries, setPantries] = useState<PantryDetails[]>([]);
  const [pantryImagesOpen, setPantryImagesOpen] = useState(false);
  const [pantryImage, setPantryImage] = useState('');

  useEffect(() => {
    console.log('Pantries page rendered');
    pantryListRetriever();
  }, []);

  const addCollaborator = () => {
    if (collaboratorInput.trim()) {
      setCollaborators([...collaborators, collaboratorInput.trim()]);
      setCollaboratorInput('');
    }
  };

  const handleAddPantry = () => {
    setModalVisible(true);
  };

  const handleCancelAdd = () => {
    setModalVisible(false);
    setPantryName('');
    setPantryImage('');
    setCollaborators([]);
  };

  const createPantry = async (pantryName: string, UID: string, pantryImage: string) => {
    try {
      const newPantry = {
        name: pantryName,
        ownerId: UID,
        imageSource: pantryImage,
      };

      const pantryResponse = await axios.post(`${url}/pantries/`, newPantry);
      const retrievedPantry = pantryResponse.data;

      return retrievedPantry;
    } catch (error) {
      console.error('Error during pantry creation:', error);
      throw new Error('There was an error creating the pantry. Please try again.');
    }
  };

  const addCollaborators = async (pantryId: string, collaborators: string[]) => {
    try {
      if (collaborators.length > 0) {
        const collaboratorPayload = {
          collaborators: collaborators.map((collaborator) => ({ uid: collaborator })),
        };

        await axios.put(`${url}/pantries/${pantryId}/addCollaborators`, collaboratorPayload);
      }
    } catch (error) {
      console.error('Error during adding collaborators:', error);
      throw new Error('There was an error adding collaborators. Please try again.');
    }
  };

  const submitPantry = async () => {
    try {
      if (!uid) {
        throw new Error('User ID is missing.');
      }

      const retrievedPantry = await createPantry(pantryName, uid, pantryImage);

      if (retrievedPantry) {
        await addCollaborators(retrievedPantry.pantryId, collaborators);
      }

      await pantryListRetriever();
      handleCancelAdd();
    } catch (error) {
      console.error('Error during pantry submission:', error);
      alert('There was an error creating the pantry or adding collaborators. Please try again.');
    }
  };

  const pantryListRetriever = async () => {
    try {
      if (!uid) {
        console.error('UID is missing. Unable to retrieve pantries.');
        return;
      }

      const response = await axios.get(`${url}/users/${uid}/retrievePantries`);
      const pantryIds = response.data;

      const pantryDetails = await retrievePantryDetails(pantryIds);

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
      <DarkButton onPress={handleAddPantry} title={'Add Pantry'} style={{ margin: 15 }} />
      {/* Modal popup for adding a new pantry */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Add New Pantry</Text>
            <TextInput
              placeholder="Pantry Name"
              value={pantryName}
              onChangeText={setPantryName}
              style={{
                borderRadius: 8,
                padding: 8,
                borderWidth: 1,
              }}
              placeholderTextColor="#000"
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
              data={pantryImages}
              labelField="label"
              valueField="value"
              placeholder="Location"
              value={pantryImage}
              onFocus={() => setPantryImagesOpen(true)}
              onBlur={() => setPantryImagesOpen(false)}
              onChange={(item) => {
                setPantryImage(item.value);
                setPantryImagesOpen(false);
              }}
              maxHeight={200}
            />
            {/* Submit Button */}
            <TouchableOpacity
              onPress={submitPantry}
              style={{
                padding: 10,
                backgroundColor: Colors.darkerGreen,
                borderRadius: 5,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Pantry</Text>
            </TouchableOpacity>
            {/* Close Button */}
            <TouchableOpacity onPress={handleCancelAdd} style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ color: 'grey' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Pantry List */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 15 }} className="bg-custom-background">
        {pantries.map((pantry) => {
          const pantryKey = pantry.imageSource?.toLowerCase() as PantryKeys;
          return (
            <View key={pantry.pantryId} className="mt-5">
              <PantryButton
                title={pantry.pantryName!}
                onPress={() => router.push(`./individualpantry?pantryId=${pantry.pantryId}`)}
                imageSource={Images[pantryKey] || Images.other}
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
