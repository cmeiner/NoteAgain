import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { TextThin } from '../../utils/styles/FontStyles';

export const NewReminder = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextThin color="black">New reminder</TextThin>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});
