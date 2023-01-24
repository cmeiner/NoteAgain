import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
//import { createReminder } from '../../../hooks/firebase/ReminderHooks';
import { useEditContext } from '../../../contexts/EditContext';
import { useItemContext } from '../../../contexts/ItemContext';
import { useModalContext } from '../../../contexts/ModalContext';
import { showToast } from '../../../utils/constants/ToastHelper';
import { TextThin } from '../../../utils/styles/FontStyles';
import { FormButton } from '../../small/FormButton';
import * as Notifications from 'expo-notifications';
import {
  addNotification,
  removeNotifcation,
} from '../../../../hooks/notifHooks';

export const ReminderForm = () => {
  const { reminderData, editVisible, toggleEdit } = useEditContext();
  const { addReminder, updateReminder } = useItemContext();
  const [date, setDate] = useState<Date>(new Date());
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    if (reminderData.remindAt && reminderData.remindAt !== 'Dont remind') {
      setDate(new Date(reminderData.remindAt));
      setChecked(true);
    }

    async function test() {
      const scheduledNotifications: any =
        await Notifications.getAllScheduledNotificationsAsync();
      for (let noti of scheduledNotifications) {
        console.log(noti.trigger.dateComponents);
      }
    }
    test();
  }, [reminderData]);

  const updateDate = (event: DateTimePickerEvent, date: Date) => {
    const {
      type,
      nativeEvent: { timestamp },
    } = event;
    setDate(date);
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
    if (isChecked) {
      addNotification(date, `Don't forget ${data.title} in 10 Minutes`);
    }

    addReminder(data);
    toggleNew(false);
    showToast('newReminder');
  };

  const onSubmitSaveEdit = async (data) => {
    data = isChecked
      ? { ...data, remindAt: date }
      : { ...data, remindAt: 'Dont remind' };
    if (isChecked) {
      console.log('Icheckad');
      if (reminderData.remindAt instanceof Date) {
        console.log('finns date tar bort noti');
        removeNotifcation(
          `Don't forget ${reminderData.title} in 10 Minutes`,
          reminderData.remindAt
        );
        addNotification(
          data.remindAt,
          `Don't forget ${data.title} in 10 Minutes`
        );
      }
    }
    updateReminder(data, date.valueOf());
    toggleEdit(false, 'reminders');
    toggleNew(false);
    showToast('editReminder');
  };

  return (
    <View style={styles.container}>
      <View>
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
                enablesReturnKeyAutomatically={true}
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
            maxLength: 1000,
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
                placeholder='"Pick up pizza"'
                enablesReturnKeyAutomatically={true}
                multiline
              />
            </View>
          )}
          name="description"
        />
        {errors.description && (
          <Text style={styles.errorText}>Please enter a description</Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
        >
          <TextThin color="black">Notify me</TextThin>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#D77451' : undefined}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
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
      <View>
        {editVisible ? (
          <FormButton
            title="Save changes"
            onPress={handleSubmit(onSubmitSaveEdit)}
          />
        ) : (
          <FormButton title="Add reminder" onPress={handleSubmit(onSubmit)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
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
