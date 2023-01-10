import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useModalContext } from '../../contexts/ModalContext';
import { SettingsModalContent } from '../settingsModal/settingsModalContent';

export const SettingsButton = () => {
  const {
    settingsModalVisible: SettingsModalVisible,
    toggleSettingsModal: toggleSettingsModal,
  } = useModalContext();
  return (
    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <TouchableOpacity
        onPress={() => {
          toggleSettingsModal(true);
        }}
      >
        <View>
          <Ionicons name="settings-sharp" size={35} color="#D77451" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={SettingsModalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              name="close-outline"
              size={40}
              color="black"
              onPress={() => toggleSettingsModal(false)}
              style={styles.buttonClose}
            />
            <SettingsModalContent />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    borderRadius: 10,
    elevation: 3,
    marginTop: 'auto',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 340,
    height: 400,
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 15,
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
  buttonClose: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});
