import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { FormButton } from '../src/components/small/FormButton';
import { TopBar } from '../src/components/TopBar';
import { useModalContext } from '../src/contexts/ModalContext';
import { useSettingsContext } from '../src/contexts/SettingsContext';
import { useUserContext } from '../src/contexts/UserContext';
import { TextH2 } from '../src/utils/styles/FontStyles';

export const Profile = () => {
  const { currentUser } = useUserContext();
  const { toggleSettingsModal } = useModalContext();
  const { setCurrentlyShowing } = useSettingsContext();

  useEffect(() => {
    console.log(currentUser.profilePicture);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          top: 500,
        }}
        source={require('../assets/images/Wave.png')}
      />
      <View style={{ marginHorizontal: 10 }}>
        <TopBar settings />
      </View>
      <View
        style={{
          marginTop: 40,
          marginHorizontal: 10,
          height: '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{ width: 180, height: 180, borderRadius: 10 }}
          source={
            currentUser.profilePicture.length > 2
              ? { uri: currentUser.profilePicture }
              : require('../assets/images/placeholder-profile.jpg')
          }
        />
        {currentUser.profilePicture.length > 2 ? null : (
          <>
            <View style={{ marginVertical: 20 }}>
              <TextH2 color="black">
                Looks like you haven't chosen a profile picture yet
              </TextH2>
            </View>
            <FormButton
              title="Choose profile picture"
              onPress={() => {
                toggleSettingsModal(true);
                setCurrentlyShowing('profilePicture');
              }}
            />
          </>
        )}
        <View style={{ height: 20 }} />
        <TextH2 color="black">{currentUser.displayName}</TextH2>
        <TextH2 color="black">{currentUser.email}</TextH2>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
