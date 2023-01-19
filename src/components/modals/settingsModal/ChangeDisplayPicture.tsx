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
      <View style={{ alignItems: 'center', marginBottom: 70 }}>
        <UploadMedia />
      </View>

      <View style={styles.buttonContainer}>
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
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
  },
});
