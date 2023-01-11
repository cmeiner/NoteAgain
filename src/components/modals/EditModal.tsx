import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { useModalContext } from '../../contexts/ModalContext';
import { TextH3 } from '../../utils/styles/FontStyles';
import { ReminderForm } from './newModal/ReminderForm';
import { TodoForm } from './newModal/TodoForm';

export const EditModal = () => {
  const { editVisible, toggleEdit, modalType } = useModalContext();
  return (
    <Modal animationType="slide" transparent={true} visible={editVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            name="close-outline"
            size={40}
            color="black"
            onPress={() => {
              toggleEdit(false, 'reminder');
            }}
            style={styles.buttonClose}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            {modalType === 'reminder' ? (
              <>
                <View style={styles.modalTitle}>
                  <TextH3 color="black">Edit reminder</TextH3>
                </View>
                <ReminderForm />
              </>
            ) : (
              <>
                <View style={styles.modalTitle}>
                  <TextH3 color="black">Edit todo</TextH3>
                </View>
                <TodoForm />
              </>
            )}
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
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
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
  buttonClose: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    margin: 35,
  },
  modalTitle: {
    marginRight: 'auto',
  },
});
