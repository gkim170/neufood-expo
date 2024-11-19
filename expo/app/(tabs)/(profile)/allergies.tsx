import { View, Text, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import BackArrow from '@/components/BackArrow';
import AllergyGrid from '@/components/AllergyGrid';


const allergies = () => {
  // Used to make sure we get here correctly (for testing), can see this log in the terminal
  useEffect(() => {
    console.log('Allergies page rendered');
  }, []);

  // set modal to invisible as default
  const [modalVisible, setModalVisible] = useState(false);
  
  const handleEdit = () => {
    console.log('edit allergies...'); 
    setModalVisible(true); 
  }

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleChange = (newMessage: string[]) => {
    console.log(newMessage);
    setModalVisible(!modalVisible);
  };

  return (
    <View className="flex-1 justify-center items-center bg-custom-background">
      <View style={styles.container}>
        <View style={styles.back}>
            <BackArrow/>
        </View>
        <TouchableOpacity
            style={styles.editbutton}
            onPress={handleEdit}>
              <Text style={styles.textedit}>Edit</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.body}>
        <Text className="font-bold text-2xl my-4" style={styles.title}>
          My Allergies
        </Text>
        <View style={styles.allergybuttons}>

        </View>

        {/* Modal Component */}
        <Modal
          animationType="slide"
          transparent={true}     // To make the background dim
          visible={modalVisible}
          onRequestClose={toggleModal} // Handle Android back button press
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>My Allergies</Text>
              <AllergyGrid onMessageSend={handleChange}/>
              <View style={styles.modalbuttons}>
                <Button title="Close" onPress={toggleModal} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};


export default allergies;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',          
    justifyContent: 'space-between', 
    alignItems: 'center',           
    paddingHorizontal: 10,
    height: 60,                     
    marginTop: 5,
  },
  back: {
    flex: 1,
    padding: 10,
    marginBottom: 30,
  },  
  editbutton: {
    flex: 1,
    padding: 10,
    paddingTop: 30, 
  },
  textedit: {
    textAlign: 'right',
  },
  body: {
    flex: 7,
    paddingTop: 40,
  },
  title: {
    textAlign: 'left',
  },
  allergybuttons: {},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimming background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  modalbuttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})