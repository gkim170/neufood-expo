import { View, Text } from 'react-native'
import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';



const TabsLayout = () => {
  return (
    <Tabs 
        screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: Colors.darkerGreen, // Sets the color for the current clicked tab's icon and label
            tabBarStyle: {
                backgroundColor: Colors.primaryBackground, // Set your desired background color
                height: 85, // Height of the tab bar
                paddingBottom: 20, // Padding at the bottom for spacing
            },
        }}
    >
        <Tabs.Screen 
            name="home" // Name of the file referencing
            options={{ 
                tabBarLabel: "Home", // What shows up for the tab label underneath the icon
                tabBarIcon: ({ color }) => // destructure color passing in the arrow function so we can pass it into the icon
                // Tab icon imported above
                <Ionicons 
                    name="home-outline" // Icon name for the Home tab as defined in expo/vector-icons, can be found on website
                    size={30} // Size of icon
                    color={color} // Color of icon passed dynamically from the screenOptions
                />
            }}
        />
        <Tabs.Screen 
            name="pantries" 
            options={{ 
                tabBarLabel: "Pantries",
                // destructure color passing in the arrow function so we can pass it into the icon
                tabBarIcon: ({ color }) =>
                <Ionicons 
                    name="basket-outline" 
                    size={30} 
                    color={color} />
            }}
        />
        <Tabs.Screen 
            name="scanner" 
            options={{ 
                tabBarLabel: "Scanner",
                // destructure color passing in the arrow function so we can pass it into the icon
                tabBarIcon: ({ color }) =>
                <MaterialCommunityIcons 
                    name="line-scan" 
                    size={30} 
                    color={color}
                />
            }}
        />
        <Tabs.Screen 
            name="recipes" 
            options={{ 
                tabBarLabel: "Recipes",
                // destructure color passing in the arrow function so we can pass it into the icon
                tabBarIcon: ({ color }) =>
                <Entypo 
                    name="open-book" 
                    size={30} 
                    color={color}
                />
            }}
        />
        <Tabs.Screen 
            name="profile" 
            options={{ 
                tabBarLabel: "Profile",
                // destructure color passing in the arrow function so we can pass it into the icon
                tabBarIcon: ({ color }) =>
                <Ionicons 
                    name="person-outline" 
                    size={30} 
                    color={color} />
            }}
        />
    </Tabs>
  );
};

export default TabsLayout;