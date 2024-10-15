// Contains the horizontally scrollable info slides

import React, { useState } from 'react';
import { View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageControl from './PageControl'; // Adjust the path if necessary
import CustomButton from './CustomButton';
import { useRouter } from 'expo-router';
import InfoPageStyle from './InfoPageStyle';
// import { Fonts, FontSizes } from '@/constants/Fonts.ts';r

const InitialInfoPager: React.FC = () => {
  // State to track the current page index for updating page control dots
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
        <InfoPageStyle title="Welcome to neufood!" image="logoNoText" imageWidth={150} imageHeight={150} key="1">
            <Text className="my-4 text-base font-primary">
                We help shared households{' '}
                <Text className="font-bold">
                    save money
                </Text>
                {' '}by:
            </Text>
            <View className="flex-col ml-7">
                {/* This formatting allows me to make just a section of the text bold */}
                <Text className="my-4 text-base font-primary">
                    {/* \u2022 is a bullet point */}
                    {'\u2022'} {' '}
                    <Text className="font-bold">
                        Tracking
                    </Text>
                    {' '}pantry inventory
                </Text>
                <Text className="my-4 text-base font-primary">
                    {'\u2022'} {' '}
                    <Text className="font-bold">
                        Recommending
                    </Text>
                    {' '}ways to fully utilize ingredients
                </Text>
            </View>
        </InfoPageStyle>

        {/* Page 2 */}
        <InfoPageStyle title="Create a pantry" image="network" imageWidth={250} imageHeight={250} key="2">
          <Text className="my-4 text-base font-primary px-8">
            Add your household members as contributors
          </Text>
        </InfoPageStyle>

        {/* Page 3 */}
        <InfoPageStyle title="Scan your grocery receipts to add ingredients to your shared pantry" image="time" imageWidth={250} imageHeight={250} key="3">
            <Text className="my-2 text-base font-primary">
            You’ll be able to track:
            </Text>
            <View className="flex-col ml-7">
                <Text className="my-1 text-base font-primary">
                    {'\u2022'} Cost
                </Text>
                <Text className="my-1 text-base font-primary">
                    {'\u2022'} Quantity
                </Text>
                <Text className="my-1 text-base font-primary">
                    {'\u2022'} Date purchased
                </Text>
                <Text className="my-1 text-base font-primary">
                    {'\u2022'} Expiration date
                </Text>
            </View>
        </InfoPageStyle>

        {/* Page 4 */}
        <InfoPageStyle title="Utilize the Recipe Recommendation" image="recipe" imageWidth={250} imageHeight={250} key="4">
          <Text className="my-2 text-base font-primary px-8">
            Look up an ingredient and see generated recipes
          </Text>
        </InfoPageStyle>

        {/* Page 5 */}
        <InfoPageStyle title="Ready to get started?" key="5">
          <CustomButton 
            onPress={() => router.push("/sign-in")} 
            title={'Sign in'}
          />
           <CustomButton 
            onPress={() => router.push("/(home)")} 
            title={'Get Started'}
          />
        </InfoPageStyle>
      </PagerView>

      {/* Styling used to move the dots lower on the page */}
      <View className="absolute bottom-3 left-0 right-0">
        {/* PageControl component shows the dots at the bottom of the screen so you can see how many pages there are */}
        <PageControl currentIndex={currentIndex} total={5} />
      </View>
    </SafeAreaView>
  );
};

export default InitialInfoPager;
