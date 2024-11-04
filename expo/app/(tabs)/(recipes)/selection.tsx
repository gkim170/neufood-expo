import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import DarkButton from '../../../components/DarkButton';
import { router } from 'expo-router';
import BackArrow from '@/components/BackArrow';
import ButtonGrid from '@/components/RecipeButtonGrid';
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

const Selection = () => {
  const [pantries, setPantries] = useState<PantryDetails[]>([]);

  useEffect(() => {
    console.log('Recipe generator selections page rendered');
    pantryListRetriever();
    console.log('Ran pantryListReceiver');
  }, []);


  // Get the list of pantries from the user's pantry array using uid, which is currently hardcoded as 333
  const pantryListRetriever = async () => {
    try {
      // Send the get request to the database to get pantry ids
      // Have to replace the constant UID with the user's actual ID eventually
      const response = await axios.get(`${url}/users/${UID}/retrievePantries`);
      const pantryIds = response.data;
      console.log("Pantry IDs:", pantryIds);
      
      // Get the pantry names from the retrievePantryDetails function
      const pantryDetails = await retrievePantryDetails(pantryIds);
      console.log("Pantry Details:", pantryDetails);
      
      // Set the pantry state to the details we received, the ids and name
      setPantries(pantryDetails);
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
    <SafeAreaView className="flex-1 bg-custom-background">
      <View className="flex-1 justify-start">
        <BackArrow />
        <Text className="font-primary text-l mt-7 mb-4 mx-10 px-6">
          We match your pantry, taste profile, preferences, and allergies to find tailored recipes!
        </Text>
        <ButtonGrid/>
        <View className="justify-left">
          <Text className="font-bold text-xl mt-2 mb-2 px-10">
            Pantries
          </Text>
        </View>
          {/* Display a flat list of pantry names */}
          {/* Going to change this to a flatlist of styled pantry component */}
          <FlatList
            data={pantries}
            keyExtractor={(item) => item.pantryId}
            renderItem={({ item }) => (
              // Right not onPress is just a console log but changing to change state of the selected pantry
              <TouchableOpacity onPress={() => console.log(`Selected ${item.pantryName}`)}>
                <Text className="mx-10 p-2">{item.pantryName}</Text>
              </TouchableOpacity>
            )}
          />
      </View>
      <View className="items-center mb-4">
        <DarkButton
          onPress={() => router.push('./generated')}
          title={'Show Me Recipes'}
        />
      </View>
    </SafeAreaView>
  );
};

export default Selection;
