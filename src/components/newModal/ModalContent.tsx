import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { NewReminder } from './NewReminder';
import { NewTodo } from './NewTodo';

export const ModalContent = () => {
  const [newReminder, setNewReminder] = useState(false);
  const toggleSwitch = () => {
    setNewReminder((previousState) => !previousState);
    console.log('New reminder is', '+', newReminder);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.switchBox}>
        <Text>Reminder</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#767577' }}
          thumbColor={newReminder ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={newReminder}
        />
        <Text>Todo</Text>
      </View>
      {!newReminder ? <NewReminder /> : <NewTodo />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});
