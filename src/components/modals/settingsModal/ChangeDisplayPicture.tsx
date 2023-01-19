import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSettingsContext } from '../../../contexts/SettingsContext';
import { TextP } from '../../../utils/styles/FontStyles';
import { FormButton } from '../../small/FormButton';
import { UploadMedia } from '../../small/UploadMedia';

export const ChangeDisplayPicture = () => {
  const { setCurrentlyShowing } = useSettingsContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ alignItems: 'center' }}>
        <TextP color="black">Change your display picture</TextP>
      </View>
      <View style={{ alignItems: 'center' }}>
        <UploadMedia />
      </View>

      <View style={{ position: 'absolute', bottom: 10 }}>
        <FormButton
          title="Go back"
          onPress={() => {
            setCurrentlyShowing('settings');
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 350,
  },
  formContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 280,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
  },
  errorText: {
    color: 'red',
    marginBottom: -10,
  },
});
