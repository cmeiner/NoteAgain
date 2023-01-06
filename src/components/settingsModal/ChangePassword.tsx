import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { auth } from '../../../config/firebaseConfig';
import { userContext } from '../../contexts/UserContext';
import { TextH3, TextThin } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const ChangePassword = () => {
  const { updateUserPassword } = userContext();

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
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextH3 color="black">Change your password</TextH3>

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
          </View>
        )}
        name="newPassword"
      />
      {errors.newPassword && (
        <Text style={styles.errorText}>
          Please please choose a new password
        </Text>
      )}
      <FormButton width="240px" title="Save" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 472,
  },
  inputContainer: {
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 5,
  },
});
