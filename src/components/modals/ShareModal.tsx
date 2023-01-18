import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { shareItem_db } from '../../../hooks/firebase/ShareHooks';
import { useShareContext } from '../../contexts/ShareContext';
import { TextH3, TextThin } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const ShareModal = () => {
  const { shareVisible, toggleShare, shareID, itemType } = useShareContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues: { receiver: '' },
  });

  const onSubmit = () => {
    const receiver = getValues('receiver');
    shareItem_db(shareID, itemType, receiver.toLocaleLowerCase());
    toggleShare(false, itemType);
    setValue('receiver', '');
  };

  return (
    <Modal animationType="slide" transparent={true} visible={shareVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Ionicons
            name="close-outline"
            size={40}
            color="black"
            onPress={() => {
              toggleShare(false, 'reminders');
              setValue('receiver', '');
              clearErrors();
            }}
            style={styles.buttonClose}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.modalTitle}>
              <TextH3 color="black">Share this with someone</TextH3>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                  required: true,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid e-mail address',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextThin color="black">Their e-mail</TextThin>
                    <TextInput
                      style={styles.input}
                      placeholder="john@doe.com"
                      placeholderTextColor="#808080"
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  </View>
                )}
                name="receiver"
              />
              {errors.receiver && (
                <Text style={styles.errorText}>{errors.receiver.message}</Text>
              )}
              <FormButton title="Share it!" onPress={handleSubmit(onSubmit)} />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 340,
    height: 300,
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
  buttonClose: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  container: {
    alignItems: 'center',
    height: '100%',
  },
  modalTitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  errorText: {
    position: 'relative',
    color: 'red',
    marginTop: 5,
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
});
