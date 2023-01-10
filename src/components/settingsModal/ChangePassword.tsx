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
import Toast from 'react-native-toast-message';
import { useModalContext } from '../../contexts/ModalContext';
import { useSettingsContext } from '../../contexts/SettingsContext';
import { useUserCotext } from '../../contexts/UserContext';
import { TextP } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const ChangePassword = () => {
  const { updateUserPassword } = useUserCotext();
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

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Password updated! 😊',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 2000,
    });
  };

  const onSubmit = async (data) => {
    updateUserPassword(data.newPassword);
    showToast();
    setCurrentlyShowing('settings');
    toggleSettingsModal(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ alignItems: 'center' }}>
        <TextP color="black">Change your Password</TextP>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextP color="black">New password</TextP>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
            </View>
          )}
          name="newPassword"
        />
        {errors.newPassword && (
          <Text style={styles.errorText}>
            Please please choose a new password
          </Text>
        )}
      </View>
      <View style={{ position: 'absolute', bottom: 10 }}>
        <FormButton
          width="240px"
          title="Save"
          onPress={handleSubmit(onSubmit)}
        />
        <FormButton
          width="240px"
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
    height: 350,
    alignItems: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: 280,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginTop: -30,
    marginBottom: 13,
  },
});
