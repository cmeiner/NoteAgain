import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AddNewModalContent } from '../../components/modals/newModal/AddNewModalContent';
import { useEditContext } from '../../contexts/EditContext';
import { useModalContext } from '../../contexts/ModalContext';

export const AddButton = () => {
  const { newVisible, toggleNew } = useModalContext();
  const { resetData } = useEditContext();

  const openNewModal = () => {
    toggleNew(true);
    resetData();
  };

  const closeNewModal = () => {
    toggleNew(false);
    resetData();
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <TouchableOpacity onPress={openNewModal}>
        <Ionicons name="md-add-circle" size={45} color="black" />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={newVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={40}
              color="black"
              onPress={closeNewModal}
              style={styles.buttonClose}
            />
            <AddNewModalContent />
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
    position: 'absolute',
    right: 5,
    top: 5,
  },
});
