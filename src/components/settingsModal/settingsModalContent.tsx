import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { TextH3 } from '../../utils/styles/FontStyles';
import { ChangeButton } from '../small/ChangeButton';
import { FormButton } from '../small/FormButton';
import { ChangeDisplayName } from './ChangeDisplayName';
import { ChangeEmail } from './ChangeEmail';
import { ChangePassword } from './ChangePassword';

export const SettingsModalContent = () => {
  const [settings, setSettings] = useState(true);
  const [changeDisplayName, setChangeDisplayName] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View>
        <TextH3 color="black">Settings</TextH3>
      </View>

      {settings && (
        <View style={styles.buttonContainer}>
          <ChangeButton
            title="Change display name"
            onPress={() => {
              setSettings(false);
              setChangeDisplayName((previousState) => !previousState);
            }}
            width="250px"
          />
          <ChangeButton
            title="Change email"
            onPress={() => {
              setSettings(false);
              setChangeEmail((previousState) => !previousState);
            }}
            width="250px"
          />
          <ChangeButton
            title="Change password"
            onPress={() => {
              setSettings(false);
              setChangePassword((previousState) => !previousState);
            }}
            width="250px"
          />
        </View>
      )}
      <View>
        {changeDisplayName && <ChangeDisplayName />}
        {changeEmail && <ChangeEmail />}
        {changePassword && <ChangePassword />}
      </View>
      {!settings && (
        <View style={{ position: 'absolute', bottom: 10 }}>
          <FormButton
            width="240px"
            title="Go back"
            onPress={() => {
              setSettings(true);
              setChangeDisplayName(false);
              setChangeEmail(false);
              setChangePassword(false);
            }}
          />
        </View>
      )}
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
  },
});
