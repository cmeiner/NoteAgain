import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSettingsContext } from '../../../contexts/SettingsContext';
import { TextP } from '../../../utils/styles/FontStyles';
import { FormButton } from '../../small/FormButton';
import { UploadMedia } from '../../small/UploadMedia';

export const ChangeProfilePicture = () => {
  const { setCurrentlyShowing } = useSettingsContext();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <TextP color="black">Change your profile picture</TextP>
      </View>
      <View style={{ alignItems: 'center' }}>
        <UploadMedia mode="change" />
      </View>
      <View>
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
    justifyContent: 'space-between',
    flex: 1,
  },
});
