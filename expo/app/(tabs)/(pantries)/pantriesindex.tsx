import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import DarkButton from '@/components/DarkButton';
import PantryButton from '@/components/PantryButton';
import Images from '@/constants/images';

const Pantries = () => {
    // TODO: FIX FONTS EVERYWHERE IN PANTRIES!
    // Used to make sure we get here correctly (for testing), can see this log in the terminal
    useEffect(() => {
      console.log('Pantries page rendered');
    }, []);

    //test data
    const pantryData = [
      {
        id: 1,
        title: "Pantry 1",
        imageSource: Images.defaultPantry,
      },
      {
        id: 2,
        title: "Pantry 2",
        imageSource: Images.other,
      },
      {
        id: 3,
        title: "Pantry 3",
        imageSource: Images.protein,
      },
      {
        id: 4,
        title: "Pantry 4",
        imageSource: Images.vegetables,
      },
      {
        id: 5,
        title: "Pantry 5",
        imageSource: Images.condiments,
      },
      // Add more pantry items as needed
    ];
  
  return (
  
    <View className="flex-1 justify-center items-center bg-custom-background">
      <DarkButton 
        onPress={() => router.push("./addpantry")} 
        title={'Add Pantry'}
        style={{ margin: 15 }}
      />
      <Text></Text>
      {/** DYNAMICALLY POPULATE FOR A LIST OF JSON! */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-custom-background">
      {pantryData.map((pantry) => (
        <View className="mt-5">
          <PantryButton 
            key={pantry.id}
            title={pantry.title} 
            onPress={() => router.push("./individualpantry")} //want to push the individual pantry AND pantry data to the thing I think
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
