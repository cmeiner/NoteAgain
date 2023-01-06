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
import { TextH3, TextP, TextThin } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const ChangeEmail = () => {
  const { updateUserEmail } = userContext();

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

  const onSubmit = async (data) => {
    updateUserEmail(data.newEmail, data.password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ alignItems: 'center' }}>
        <TextP color="black">Change your Email</TextP>
      </View>

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
              // placeholder={auth.currentUser.email}
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
      <FormButton width="240px" title="Save" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // justifyContent: 'space-between',
    height: '100%',
  },
  inputContainer: {
    marginTop: 20,
    // marginBottom: 10,
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
