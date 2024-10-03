// Displays a row of indicator dots at the bottom of swipable pages

import React from 'react';
import { View } from 'react-native';

// Define the props interface for PageControl component
interface PageControlProps {
  currentIndex: number; // Index of the current page
  total: number; // Total number of pages
}

const PageControl: React.FC<PageControlProps> = ({ currentIndex, total }) => {
  return (
    // flex-row arranges dots in a row, justify-center puts them in the center, and mt-4 adds a top margin
    <View className="flex-row justify-center justify-center mt-4">
      {/* Creates an array with the length of total pages then maps over the array to render a dot for each page */}
      {Array.from({ length: total }).map((_, index) => (
        // View used to display dots
        <View
          key={index}
          // w-2 h-2 is width and height of dots, mx-1 is space between dots, rounded-full makes them rounded
          // Dot is black when on current index and gray otherwise
          className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-black' : 'bg-gray-400'}`}
        />
      ))}
    </View>
  );
};

export default PageControl;
