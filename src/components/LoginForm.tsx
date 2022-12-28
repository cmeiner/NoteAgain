import { useNavigation } from '@react-navigation/native';
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
import { loginUser } from '../../hooks/firebase/UserHooks';
import { FormButton } from './small/FormButton';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StackParamList = {
  NavBar: undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

export const LoginForm = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data) => {
    const signInMessage = await loginUser(data);
    if (signInMessage !== 'Success') return console.log(signInMessage);
    navigation.navigate('NavBar');
  };

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
            />
          </View>
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.errorText}> Please enter email</Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.errorText}>Please enter password</Text>
      )}
      <FormButton title="Login" onPress={handleSubmit(onSubmit)} />
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