import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Reminder, TodoList } from '../../../types/FirebaseTypes';
import { useModalContext } from '../../contexts/ModalContext';
import { TextH3 } from '../../utils/styles/FontStyles';
import { NewReminder } from './newModal/NewReminder';

type Props = {
  defaultValuesReminder?: Reminder;
  defaultValuesTodo?: TodoList;
};

export const EditModal = ({
  defaultValuesReminder,
  defaultValuesTodo,
}: Props) => {
  const { editVisible, toggleEdit, data } = useModalContext();
  return (
    <Modal animationType="slide" transparent={true} visible={editVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            name="close-outline"
            size={40}
            color="black"
            onPress={() => {
              toggleEdit(false);
            }}
            style={styles.buttonClose}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.modalTitle}>
              <TextH3 color="black">Edit reminder</TextH3>
            </View>
            <NewReminder />
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
  buttonClose: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  container: {
    alignItems: 'center',
    height: '100%',
  },
  switch: {
    marginRight: 'auto',
    transform: [{ scale: 0.8 }],
  },
  modalTitle: {
    marginRight: 'auto',
  },
});
