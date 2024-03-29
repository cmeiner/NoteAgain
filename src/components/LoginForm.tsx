import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { loginUser } from '../../hooks/firebase/UserHooks';
import { useUserContext } from '../contexts/UserContext';
import { showToast } from '../utils/constants/ToastHelper';
import { FormButton } from './small/FormButton';

type StackParamList = {
  HomeScreen: undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogIn, setErrorLogIn] = useState('');
  const navigation = useNavigation<NavigationProps>();
  const { getUser } = useUserContext();
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
    if (signInMessage !== 'Success') return setErrorLogIn(signInMessage);
    getUser();
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate('HomeScreen');
      setIsLoading(false);
    }, 1000);
    showToast('loginSuccesful');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text), setErrorLogIn('');
                  }}
                  value={value}
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text style={styles.errorText}>
                    Please enter your e-mail address
                  </Text>
                )}
              </View>
            )}
            name="email"
          />

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text), setErrorLogIn('');
                  }}
                  value={value}
                  placeholder="Password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    Please enter your password
                  </Text>
                )}
                {errorLogIn.length > 2 && (
                  <Text style={styles.errorText}>{errorLogIn}</Text>
                )}
              </View>
            )}
            name="password"
          />

          <FormButton title="Log in" onPress={handleSubmit(onSubmit)} />
        </>
      )}
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
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
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
