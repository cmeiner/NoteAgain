import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
//import { createReminder } from '../../../hooks/firebase/ReminderHooks';
import Toast from 'react-native-toast-message';
import { useItemContext } from '../../../contexts/ItemContext';
import { useModalContext } from '../../../contexts/ModalContext';
import { TextThin } from '../../../utils/styles/FontStyles';
import { FormButton } from '../../small/FormButton';

export const ReminderForm = () => {
  const { reminderData } = useModalContext();
  const { addReminder } = useItemContext();
  const [date, setDate] = useState<Date>(new Date());
  const [isChecked, setChecked] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'New reminder added 🙂',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 1000,
    });
  };

  const updateDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    setDate(date);
    console.log(date);
  };
  const { toggleNew } = useModalContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: reminderData,
  });
  const onSubmit = async (data) => {
    data = isChecked
      ? { ...data, remindAt: date }
      : { ...data, remindAt: 'Dont remind' };
    addReminder(data);
    toggleNew(false);
    showToast();
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
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TextThin color="black">Notify me</TextThin>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#D77451' : undefined}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {isChecked ? (
            <DateTimePicker
              onChange={updateDate}
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: 10,
              }}
              accentColor="#D77451"
              value={date}
              display="clock"
              mode="datetime"
              themeVariant="light"
            />
          ) : null}
        </View>
      </View>
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
  checkbox: {
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ffff',
    border: 'none !important',
    appearance: 'none',
    outline: 'none',
    margin: 10,
  },
});
