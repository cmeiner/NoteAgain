import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import TestButton from './small/formButton';
import { loginUser, registerUser } from '../hooks/firebase/UserHooks';
import { useForm, Controller } from 'react-hook-form';

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (data) => registerUser(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              textContentType="emailAddress"
            />
          </View>
        )}
        name="email"
      />
      {errors.email && <Text style={styles.errorText}>Please enter email</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Display name"
              textContentType="name"
            />
          </View>
        )}
        name="displayName"
      />
      {errors.email && (
        <Text style={styles.errorText}>Please choose display name</Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          minLength: 6,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={true}
              placeholder="Password"
              textContentType="newPassword"
            />
          </View>
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>Please choose password</Text>
      )}
      <TestButton title="Register" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 414,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitle: {
    margin: 12,
  },
  input: {
    height: 50,
    width: 350,
    marginTop: 24,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});