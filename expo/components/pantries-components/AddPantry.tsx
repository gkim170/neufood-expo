import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomButton from '@/components/CustomButton';

const AddPantry = ({ goBack }) => {  // Accept goBack function as a prop
  const [pantryName, setPantryName] = useState('');  // Pantry name input state

  return (
    // Add Pantry form
    <View style={{ width: '100%', padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 16 }}>Create Your Pantry</Text>
      <TextInput
        style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, width: '80%', marginBottom: 20 }}
        placeholder="Enter Pantry Name"
        value={pantryName}
        onChangeText={setPantryName}
      />
      <CustomButton 
        onPress={() => {
            //hit the route to create a new pantry here
          console.log('Pantry Created:', pantryName);
          goBack();  // Call the goBack function to return to Pantries list
        }}
        title="Create Pantry"
      />
      <CustomButton 
        onPress={goBack}  // Call goBack to return to Pantries list
        title="Cancel"
      />
    </View>
  );
};

export default AddPantry;