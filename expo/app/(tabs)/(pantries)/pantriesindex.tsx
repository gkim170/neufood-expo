import { View, Text, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import DarkButton from '@/components/DarkButton';
import PantryButton from '@/components/PantryButton';
import { router } from 'expo-router';

const Pantries = () => {
    // Used to make sure we get here correctly (for testing), can see this log in the terminal
    useEffect(() => {
      console.log('Pantries page rendered');
    }, []);
    const defaultPantry = require('@/assets/images/pantries/pantry-default-img.png');
  
  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <DarkButton 
        onPress={() => router.push("./addpantry")} 
        title={'Add Pantry'}
      />
      <Text></Text>
      {/** TODO: MAKE THIS DYNAMICALLY POPULATE FOR A LIST OF JSON TITLES (and images if we want) */}
      <PantryButton 
        title="Pantry" 
        onPress={() => router.push("./individualpantry")} 
        imageSource={defaultPantry} 
      />
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
 *        auto go to (new) pantry subtab 
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
