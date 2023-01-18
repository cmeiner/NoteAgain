import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { logOutUser } from '../../../../hooks/firebase/UserHooks';
import { useModalContext } from '../../../contexts/ModalContext';
import { useSettingsContext } from '../../../contexts/SettingsContext';
import { ChangeButton } from '../../small/ChangeButton';

type StackParamList = {
  Login2: undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList>;

export const SettingsPage = () => {
  const { setCurrentlyShowing } = useSettingsContext();
  const navigation = useNavigation<NavigationProps>();
  const { toggleSettingsModal } = useModalContext();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ChangeButton
          title="Change display name"
          onPress={() => {
            setCurrentlyShowing('displayname');
          }}
          width="250px"
        />
        <ChangeButton
          title="Change display picture"
          onPress={() => {
            setCurrentlyShowing('displayPicture');
          }}
          width="250px"
        />
        <ChangeButton
          title="Change password"
          onPress={() => {
            setCurrentlyShowing('password');
          }}
          width="250px"
        />
      </View>
      <View>
        <ChangeButton
          title="Logout"
          onPress={() => {
            toggleSettingsModal(false);
            logOutUser();
            navigation.navigate('Login2');
          }}
          width="250px"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'space-around',
  },
});
