import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  CurrentlyShowing,
  useSettingsContext,
} from '../../contexts/SettingsContext';
import { TextH3 } from '../../utils/styles/FontStyles';
import { ChangeDisplayName } from './ChangeDisplayName';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';
import { SettingsPage } from './Settings';

export const SettingsModalContent = () => {
  const { showing } = useSettingsContext();

  const getCurrentlyShowing = (showing: CurrentlyShowing) => {
    switch (showing) {
      default:
        'settings';
        return <SettingsPage />;
      case 'displayname':
        return <ChangeDisplayName />;
      case 'email':
        return <ChangeEmail />;
      case 'password':
        return <ChangePassword />;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View>
        <TextH3 color="black">Settings</TextH3>
      </View>
      {getCurrentlyShowing(showing)}
    </KeyboardAvoidingView>
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
