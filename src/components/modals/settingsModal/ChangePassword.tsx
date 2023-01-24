import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useModalContext } from '../../../contexts/ModalContext';
import { useSettingsContext } from '../../../contexts/SettingsContext';
import { useUserContext } from '../../../contexts/UserContext';
import { showToast } from '../../../utils/constants/ToastHelper';
import { TextP, TextThin } from '../../../utils/styles/FontStyles';
import { FormButton } from '../../small/FormButton';

export const ChangePassword = () => {
  const { updateUserPassword } = useUserContext();
  const { setCurrentlyShowing } = useSettingsContext();
  const { toggleSettingsModal } = useModalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
    },
  });

  const onSubmit = async (data) => {
    updateUserPassword(data.newPassword);
    showToast('passwordUpdated');
    setCurrentlyShowing('settings');
    toggleSettingsModal(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <TextP color="black">Change your password</TextP>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextThin color="black">New password</TextThin>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
              {errors.newPassword && (
                <Text style={styles.errorText}>
                  Please choose a new password
                </Text>
              )}
            </View>
          )}
          name="newPassword"
        />
        <FormButton title="Save" onPress={handleSubmit(onSubmit)} />
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
  formContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    marginTop: 5,
    marginLeft: 7,
    bottom: -16,
  },
  inputContainer: {
    marginBottom: 27,
  },
});
