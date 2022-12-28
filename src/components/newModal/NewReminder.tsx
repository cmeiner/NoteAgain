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
import { TextH3 } from '../../utils/styles/FontStyles';
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
      <View>
        <TextH3 color="black">New reminder</TextH3>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Title</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='"Pizzatime"'
              placeholderTextColor="#808080"
              // clearButtonMode="while-editing"
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
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
              style={styles.inputDesc}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline={true}
              placeholder='"Pick up pizza"'
              enablesReturnKeyAutomatically={true}
            />
          </View>
        )}
        name="description"
      />
      {errors.description && (
        <Text style={styles.errorText}>Please enter a description</Text>
      )}
      <FormButton width="240px" title="Add" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    height: 40,
    width: 280,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
  },
  inputDesc: {
    height: 200,
    width: 280,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
