import React from 'react';
import { View, StyleSheet } from 'react-native';
import { settingsContext } from '../../contexts/SettingsContext';
import { ChangeButton } from '../small/ChangeButton';

export const SettingsPage = () => {
  const { setCurrentlyShowing } = settingsContext();

  return (
    <View style={styles.buttonContainer}>
      <ChangeButton
        title="Change display name"
        onPress={() => {
          setCurrentlyShowing('displayname');
        }}
        width="250px"
      />
      <ChangeButton
        title="Change email"
        onPress={() => {
          setCurrentlyShowing('email');
        }}
        width="250px"
      />
      <ChangeButton
        title="Change password"
        onPress={() => {
          setCurrentlyShowing('password');
        }}
        width="250px"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    height: 200,
    justifyContent: 'center',
  },
});
