import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useModalContext } from '../../contexts/ModalContext';
import { TextH3, TextThin } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const ShareModal = () => {
  const { shareVisible, toggleShare } = useModalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { receiver: '' },
  });

  const onSubmit = async (data) => {
    console.log(data);
    toggleShare(false);
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
              toggleShare(false);
            }}
            style={styles.buttonClose}
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <View style={styles.modalTitle}>
              <TextH3 color="black">Share</TextH3>
              <TextThin color="black">Enter their e-mail below</TextThin>
              <Controller
                control={control}
                rules={{
                  maxLength: 100,
                  required: true,
                }}
                name="receiver"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#808080"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              <FormButton
                width="240px"
                title="Share it!"
                onPress={handleSubmit(onSubmit)}
              />
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
  switch: {
    marginRight: 'auto',
    transform: [{ scale: 0.8 }],
  },
  modalTitle: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  input: {
    height: 40,
    width: 280,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
    marginTop: 20,
  },
});
