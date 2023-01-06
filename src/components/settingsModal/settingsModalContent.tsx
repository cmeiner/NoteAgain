import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { auth } from '../../../config/firebaseConfig';
import { userContext } from '../../contexts/UserContext';
import { TextH3, TextP } from '../../utils/styles/FontStyles';
import { ChangeButton } from '../small/ChangeButton';
import { ChangeDisplayName } from './ChangeDisplayName';

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
      <View style={styles.modalTitle}>
        <TextH3 color="black">Settings</TextH3>
      </View>
      {settings && (
        <View style={styles.buttonContainer}>
          <ChangeButton
            title="Change display name"
            onPress={() => {
              setChangeDisplayName((previousState) => !previousState);
              setChangeEmail(false);
              setChangePassword(false);
              setSettings(false);
            }}
            width="250px"
          />
          <ChangeButton
            title="Change email"
            onPress={() => {
              setChangeEmail((previousState) => !previousState);
              setSettings(false);
              setChangeDisplayName(false);
              setChangePassword(false);
            }}
            width="250px"
          />
          <ChangeButton
            title="Change password"
            onPress={() => {
              setChangePassword((previousState) => !previousState);
              setSettings(false);
              setChangeDisplayName(false);
              setChangeEmail(false);
            }}
            width="250px"
          />
        </View>
      )}
      <View>
        {changeDisplayName && <ChangeDisplayName />}
        {changeEmail && <Text>Change email</Text>}
        {changePassword && <Text>Change Password</Text>}
      </View>
      <View>
        <Pressable
          style={{
            marginTop: 100,
            backgroundColor: 'blue',
            height: 150,
            width: 150,
          }}
          onPress={() => {
            setSettings(true);
            setChangeDisplayName(false);
            setChangeEmail(false);
            setChangePassword(false);
          }}
        >
          <Text>Go back</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  modalTitle: {
    marginRight: 'auto',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  changeDisplayName: {
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
});
