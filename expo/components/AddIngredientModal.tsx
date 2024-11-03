import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Ingredient = {
    name: string;
    price: string;
    category: string;
    expirationDate: string;
    quantity: string;
  };
  
  type AddIngredientModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (ingredient: Ingredient) => void;
  };
  
  const AddIngredientModal: React.FC<AddIngredientModalProps> = ({ visible, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [quantity, setQuantity] = useState('');
  
    const handleSave = () => {
      onSave({ name, price, category, expirationDate, quantity });
      onClose();
    };
  
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text>Ingredient Name:</Text>
            <TextInput value={name} onChangeText={setName} placeholder="e.g., Sugar" />
  
            <Text>Price:</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder="e.g., 2.50" keyboardType="numeric" />
  
            <Text>Category:</Text>
            <Picker selectedValue={category} onValueChange={setCategory}>
              <Picker.Item label="Select category" value="" />
              <Picker.Item label="Dairy" value="Dairy" />
              <Picker.Item label="Vegetables" value="Vegetables" />
              <Picker.Item label="Meat" value="Meat" />
              {/* Add other categories as needed */}
            </Picker>
  
            <Text>Expiration Date:</Text>
            <TextInput value={expirationDate} onChangeText={setExpirationDate} placeholder="e.g., 2023-12-31" />
  
            <Text>Quantity:</Text>
            <TextInput value={quantity} onChangeText={setQuantity} placeholder="e.g., 10" keyboardType="numeric" />
  
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </Modal>
    );
  };
  
  export default AddIngredientModal;