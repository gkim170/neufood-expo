import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Modal } from 'react-native';

// Define the custom green color from your project’s styles
const customGreen = '#4CAF50'; // Replace this with your actual green color if different

interface WelcomeModalProps {
  visible: boolean;
  name: string;
  onAnimationEnd: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ visible, name, onAnimationEnd }) => {
  // Create animated values for each letter in the user's name only
  const nameAnimations = name.split('').map(() => new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Animate each letter in the name with both wave and color transition
      Animated.stagger(100, nameAnimations.map(anim =>
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false, // `translateY` animation can use native driver, but color requires it to be false
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ])
      )).start();

      // Close modal automatically after 3 seconds
      const timer = setTimeout(onAnimationEnd, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Function to get animated style for each letter in the user's name
  const getAnimatedStyle = (animation: Animated.Value) => ({
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['#333', customGreen],
    }),
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Static "Welcome" Text */}
          <Text style={styles.welcomeText}>Welcome to Neufood</Text>

          {/* Animated User Name Text */}
          <View style={styles.nameContainer}>
            {name.split('').map((letter, index) => (
              <Animated.Text
                key={`name-${index}`}
                style={[
                  styles.letter,
                  getAnimatedStyle(nameAnimations[index]),
                ]}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Static color for "Welcome" text
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  letter: {
    fontSize: 22,
    fontWeight: '600',
    marginHorizontal: 0.5, // Adjust this value to control letter spacing
  },
});

export default WelcomeModal;