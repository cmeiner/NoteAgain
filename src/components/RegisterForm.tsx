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
import { registerUser } from '../../hooks/firebase/UserHooks';
import { TextH3 } from '../utils/styles/FontStyles';
import { FormButton } from './small/FormButton';

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
      <View style={{ marginTop: 20 }}>
        <TextH3 color="black">Register new user</TextH3>
      </View>
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
              keyboardType="email-address"
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
      <FormButton title="Register" onPress={handleSubmit(onSubmit)} />
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
