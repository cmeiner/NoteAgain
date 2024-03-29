import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import SwitchWithIcons from 'react-native-switch-with-icons';
import { reminder, todo } from '../../../../assets/index';
import { TextH3 } from '../../../utils/styles/FontStyles';
import { ReminderForm } from './ReminderForm';
import { TodoForm } from './TodoForm';

export const AddNewModalContent = () => {
  const [newReminder, setNewReminder] = useState(false);
  const toggleSwitch = () => {
    setNewReminder((previousState) => !previousState);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.modalTitle}>
        <TextH3 color="black">
          {!newReminder ? 'New reminder' : 'New to-do'}
        </TextH3>
      </View>
      <SwitchWithIcons
        icon={{ true: todo, false: reminder }}
        value={newReminder}
        onValueChange={toggleSwitch}
        style={styles.switch}
        trackColor={{ true: '#1B1D29', false: '#D77451' }}
        thumbColor={{ true: '#D77451', false: '#1B1D29' }}
      />
      {!newReminder ? <ReminderForm /> : <TodoForm />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
