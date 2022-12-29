import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { ModalContent } from '../newModal/ModalContent';

export const AddButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View>
          <Ionicons name="md-add-circle" size={45} color="black" />
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: 20 }}>X</Text>
            </Pressable>
            <ModalContent />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 340,
    height: 600,
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
