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
            // passing this color into the icon below
            tabBarActiveTintColor: Colors.darkGreen,
            tabBarStyle: {
                backgroundColor: Colors.primaryBackground, // Set your desired background color
                height: 85, 
                paddingBottom: 20,
            },
        }}
    >
        <Tabs.Screen 
            name="home" 
            options={{ 
                tabBarLabel: "Home",
                // destructure color passing in the arrow function so we can pass it into the icon
                tabBarIcon: ({ color }) =>
                <Ionicons 
                    name="home-outline" 
                    size={30} 
                    color={color} 
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