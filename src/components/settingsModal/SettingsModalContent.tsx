import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  CurrentlyShowing,
  useSettingsContext,
} from '../../contexts/SettingsContext';
import { TextH3 } from '../../utils/styles/FontStyles';
import { ChangeDisplayName } from './ChangeDisplayName';
import { ChangeDisplayPicture } from './ChangeDisplayPicture';
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
      case 'displayPicture':
        return <ChangeDisplayPicture />;
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
