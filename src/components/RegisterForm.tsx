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
import { loginUser, registerUser } from '../../hooks/firebase/UserHooks';
import { useUserContext } from '../contexts/UserContext';
import { showToast } from '../utils/constants/ToastHelper';
import { FormButton } from './small/FormButton';

type StackParamList = {
  HomeScreen: undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

export const RegisterForm = () => {
  const navigation = useNavigation<NavigationProps>();
  const { getUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    await registerUser(data).then((status) => {
      if (status === 'Success') {
        loginUser(data).then((statusLogin) => {
          if (statusLogin !== 'Success') return console.log(statusLogin);
          setIsLoading(true);
          navigation.navigate('HomeScreen');
          setIsLoading(false);
          getUser();
          showToast('accountCreated');
        });
      } else if (status === 'Account already found') {
        setEmailInUse(true);
      }
    });
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
                    setEmailInUse(false), onChange(text);
                  }}
                  value={value}
                  placeholder="E-mail"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <Text style={styles.errorText}>
                    Please enter a valid e-mail
                  </Text>
                )}
                {emailInUse && (
                  <Text style={styles.errorText}>
                    A user with that e-mail already exists
                  </Text>
                )}
              </View>
            )}
            name="email"
          />

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
                  onChangeText={onChange}
                  value={value}
                  placeholder="Display name"
                  textContentType="name"
                />
                {errors.displayName && (
                  <Text style={styles.errorText}>
                    Please choose display name
                  </Text>
                )}
              </View>
            )}
            name="displayName"
          />

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              minLength: 6,
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                  placeholder="Password"
                  textContentType="newPassword"
                  autoCapitalize="none"
                />

                {errors.password && (
                  <Text style={styles.errorText}>Please choose password</Text>
                )}
              </View>
            )}
            name="password"
          />
          <FormButton title="Register" onPress={handleSubmit(onSubmit)} />
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
  inputContainer: {
    marginBottom: 27,
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
});
