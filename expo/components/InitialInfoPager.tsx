// Contains the horizontally scrollable info slides

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageControl from './PageControl'; // Adjust the path if necessary
import CustomButton from './CustomButton';
import { useRouter } from 'expo-router';

const InitialInfoPager: React.FC = () => {
    // State to track the currently page index for updating page control dots
    const [currentIndex, setCurrentIndex] = useState(0);

    // Used for navigation, buttons
    const router = useRouter();

    return (
    <SafeAreaView className="flex-1 bg-custom-background">
        {/* PagerView allows swipable pages */}
        <PagerView
        className="flex-1"
        initialPage={0}
        // Event handler to update the currentIndex state when a new page is selected
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
        >

            
        {/* Page 1 */}
        <View className="flex-1 justify-center items-center" key="1">
            <Text className="font-bold text-2xl my-4">
                Welcome to Neufood
            </Text>
            <Text className="my-4">
                We help shared households save money by:
            </Text>
            <Text className="my-4">
                {'\u2022'} Tracking pantry inventory
            </Text>
            <Text className="my-4">
                {'\u2022'} Recommending ways to fully utilize ingredients
            </Text>
        </View>


        {/* Page 2 */}
        <View className="flex-1 justify-center items-center" key="2">
            <Text className="font-bold text-2xl my-4">
                Create a pantry
            </Text>
            <Text className="my-4">
                Add your household members as contributors
            </Text>
        </View>


        {/* Page 3 */}
        <View className="flex-1 justify-center items-center" key="3">
            <Text className="font-bold text-2xl my-4">
                Scan your grocery receipts to add ingredients to your shared pantry
            </Text>
            <Text className="my-2">
                You’ll be able to track:
            </Text>
            <Text className="my-1">
                {'\u2022'} Cost
            </Text>
            <Text className="my-1">
                {'\u2022'} Quantity
            </Text>
            <Text className="my-1">
                {'\u2022'} Date purchased
            </Text>
            <Text className="my-1">
                {'\u2022'} Expiration date
            </Text>
        </View>


        {/* Page 4 */}
        <View className="flex-1 justify-center items-center" key="4">
            <Text className="font-bold text-2xl my-4">
                Utilize the Recipe Recommendation 
            </Text>
            <Text className="my-2">
                Look up an ingredient and see generated recipe
            </Text>
        </View>


        {/* Page 5 */}
        <View className="flex-1 justify-center items-center" key="5">
            <Text className="font-bold text-2xl my-4">
                Ready to get started?
            </Text>
            <CustomButton 
                onPress={() => router.push("/home")} 
                title={'Get Started'}
            />
        </View>


        </PagerView>

        {/* styling used to move the dots lower on the page */}
        <View className="absolute bottom-3 left-0 right-0">
            {/* PageControl component shows the dots at the bottom of the screen so you can see how many pages there are */}
            <PageControl currentIndex={currentIndex} total={5} />
        </View>
    </SafeAreaView>
  );
};

export default InitialInfoPager;
