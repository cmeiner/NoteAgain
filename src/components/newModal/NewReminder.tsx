import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { auth } from '../../../config/firebaseConfig';
import { createReminder } from '../../../hooks/firebase/ReminderHooks';
import { FormButton } from '../small/FormButton';

export const NewReminder = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      creator: auth.currentUser.uid,
      remindAt: '',
    },
  });
  const onSubmit = async (data) => {
    createReminder(data);
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text>New reminder</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Title</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              // placeholder="Title"
            />
          </View>
        )}
        name="title"
      />
      {errors.title && (
        <Text style={styles.errorText}> Please enter a title</Text>
      )}

      {errors.remindAt && (
        <Text style={styles.errorText}> Please choose a time</Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text>Description</Text>
            <TextInput
              style={styles.inputDesc}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              // placeholder="Description"
              secureTextEntry={true}
            />
          </View>
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.errorText}>Please enter a description</Text>
      )}
      <FormButton title="Save" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
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
    height: 40,
    width: 280,
    marginTop: 24,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
  },
  inputDesc: {
    height: 200,
    width: 280,
    marginTop: 24,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
