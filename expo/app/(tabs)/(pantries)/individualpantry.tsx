import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DarkButton from '@/components/DarkButton';
import BackArrow from '@/components/BackArrow';
import Images from '@/constants/images';
import { Colors } from '@/constants/Colors';
import axios, { AxiosError } from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/components/AuthContext'; // Import the AuthContext

const url = process.env.EXPO_PUBLIC_API_URL;

interface ErrorResponse {
  message: string;
}

interface Ingredient {
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  purchaseDate: string;
  expDate: string;
  _id: string;
  __v: number;
}

interface Collaborator {
  [key: string]: any;
}

interface PantryDetails {
  _id: string;
  pantryId: string;
  name: string;
  ownerId: string;
  imageSource?: string;
  collaborators: Collaborator[];
  ingredients: Ingredient[];
  __v: number;
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

type ImageKeys = 'protein' | 'dairy' | 'fruits' | 'vegetables' | 'grains' | 'protein' | 'oils' | 'condiments' | 'snacks' | 'desserts' | 'drinks' | 'spices' | 'spreads' | 'other';

const IndividualPantry = () => {
  const { uid } = useAuth(); // Pull the UID dynamically from AuthContext
  const [pantries, setPantries] = useState<PantryDetails[]>([]);
  const [selectedPantryId, setSelectedPantryId] = useState<string | undefined>(undefined);
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

  useEffect(() => {
    console.log('Individual pantry page rendered');
    pantryListRetriever();
  }, []);

  useEffect(() => {
    if (Array.isArray(pantryId)) {
      setSelectedPantryId(pantryId[0]);
    } else if (typeof pantryId === 'string') {
      setSelectedPantryId(pantryId);
    }
  }, [pantryId]);

  const pantryListRetriever = async () => {
    if (!uid) {
      console.error('UID is null, unable to retrieve pantries.');
      return;
    }

    try {
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

  const submitIngredient = async () => {
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

    console.log('Adding ingredient:', newIngredient);

    try {
      const response = await axios.put(
        `${url}/pantries/${selectedPantryId}/addIngredients`,
        { ingredients: [newIngredient] }
      );
      console.log('Ingredients added to pantry:', response.data);
      pantryListRetriever();
      handleCancelAdd();
    } catch (error) {
      console.error('Error adding ingredient:', error);
      alert('There was an error adding the ingredient. Please try again.');
    }
  };

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
      {/* ... rest of your JSX */}
    </View>
  );
};

export default IndividualPantry;