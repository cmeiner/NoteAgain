import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CurrentlyShowing,
  settingsContext,
} from '../../contexts/SettingsContext';
import { TextH3 } from '../../utils/styles/FontStyles';
import { SettingsPage } from '../settingsModal/Settings';
import { FormButton } from '../small/FormButton';
import { ChangeDisplayName } from './ChangeDisplayName';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';

export const SettingsModalContent = () => {
  const { showing, setCurrentlyShowing } = settingsContext();

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
