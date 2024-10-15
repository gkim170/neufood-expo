import { View, Text } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import AddPantry from '@/components/pantries-components/AddPantry';
import EditPantry from '@/components/pantries-components/EditPantry';

const Pantries = () => {
  const [view, setView] = useState('main'); // State to control which view to show

  const goBack = () => setView('main'); // Reset to main view

  // Define a mapping of views to components
  const renderView = () => {
    switch (view) {
      case 'addPantry':
        return <AddPantry goBack={goBack} />;
      case 'editPantry':
        return <EditPantry goBack={goBack} />;
      default:
        return (
          <View style={{ width: '100%', padding: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 16 }}>Pantries</Text>
            <CustomButton 
              onPress={() => setView('addPantry')}  // Switch to Add Pantry form
              title="Add Pantry"
            />
            <CustomButton 
              onPress={() => setView('editPantry')}  // Switch to Edit Pantry form
              title="Edit Pantry"
            />
            {/* List of existing pantries (placeholder) */}
            <View style={{ marginTop: 16 }}>
              <Text>Existing Pantry 1</Text>
              <Text>Existing Pantry 2</Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
      {renderView()}
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
