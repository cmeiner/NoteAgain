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
import Toast from 'react-native-toast-message';
import { auth } from '../../../config/firebaseConfig';
import { useModalContext } from '../../contexts/ModalContext';
import { useSettingsContext } from '../../contexts/SettingsContext';
import { useUserCotext } from '../../contexts/UserContext';
import { TextP } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const ChangeDisplayName = () => {
  const { updateUserDisplayName } = useUserCotext();
  const { setCurrentlyShowing } = useSettingsContext();
  const { toggleSettingsModal } = useModalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newDisplayName: '',
    },
  });
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Display Name updated! 😊',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 2000,
    });
  };

  const onSubmit = async (data) => {
    updateUserDisplayName(data.newDisplayName);
    showToast();
    setCurrentlyShowing('settings');
    toggleSettingsModal(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ alignItems: 'center' }}>
        <TextP color="black">Change your display name</TextP>
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextP color="black">New display name</TextP>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={auth.currentUser.displayName}
                placeholderTextColor="#808080"
              />
            </View>
          )}
          name="newDisplayName"
        />
        {errors.newDisplayName && (
          <Text style={styles.errorText}>Please choose a new display name</Text>
        )}
      </View>
      <View style={{ position: 'absolute', bottom: 10 }}>
        <FormButton
          width="240px"
          title="Save"
          onPress={handleSubmit(onSubmit)}
          disabled={false}
        />
        <FormButton
          width="240px"
          title="Go back"
          onPress={() => {
            setCurrentlyShowing('settings');
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    alignItems: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 30,
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
  errorText: {
    color: 'red',
    marginTop: -30,
    marginBottom: 13,
  },
});
