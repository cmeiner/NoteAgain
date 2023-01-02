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
import { auth } from '../../../config/firebaseConfig';
import { createReminder } from '../../../hooks/firebase/ReminderHooks';
import { useModalContext } from '../../contexts/ModalContext';
import { TextThin } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const NewReminder = () => {
  const { toggleModal } = useModalContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      createdBy: auth.currentUser.uid,
      remindAt: '',
    },
  });
  const onSubmit = async (data) => {
    createReminder(data);
    toggleModal(false);
    console.log(data);
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
          <View style={styles.inputContainer}>
            <TextThin color="black">Title</TextThin>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='"Pizzatime"'
              placeholderTextColor="#808080"
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
            <TextThin color="black">Description</TextThin>
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
      <FormButton
        width="240px"
        title="Remind me"
        onPress={handleSubmit(onSubmit)}
      />
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
  inputDesc: {
    height: 200,
    width: 280,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#808080',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
