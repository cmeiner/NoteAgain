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
import { auth } from '../../../config/firebaseConfig';
import { useModalContext } from '../../contexts/ModalContext';
import { useSettingsContext } from '../../contexts/SettingsContext';
import { useUserCotext } from '../../contexts/UserContext';
import { TextP } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const ChangeEmail = () => {
  const { updateUserEmail } = useUserCotext();
  const { setCurrentlyShowing } = useSettingsContext();
  const { toggleSettingsModal } = useModalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newEmail: '',
      password: '',
    },
  });

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Email updated! 😊',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 2000,
    });
  };

  const onSubmit = async (data) => {
    updateUserEmail(data.newEmail, data.password);
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
        <TextP color="black">Change your Email</TextP>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextP color="black">New email</TextP>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={auth.currentUser.email}
                placeholderTextColor="#808080"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}
          name="newEmail"
        />
        {errors.newEmail && (
          <Text style={styles.errorText}> Please choose a new email</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextP color="black">Confirm with password</TextP>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Password"
                placeholderTextColor="#808080"
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </View>
          )}
          name="password"
        />
        {errors.newEmail && (
          <Text style={styles.errorText}> Please enter password</Text>
        )}
      </View>
      <View style={{ position: 'absolute', bottom: 10 }}>
        <FormButton
          width="240px"
          title="Save"
          onPress={handleSubmit(onSubmit)}
          disabled={false}
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
