import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { useUserContext } from '../contexts/UserContext';
import { TextH2, TextP } from '../utils/styles/FontStyles';
import { SettingsButton } from './small/SettingsButton';
import { Logo, ProfilePic } from './SvgLibary';

type Props = {
  settings?: boolean;
};

export const TopBar = ({ settings }: Props) => {
  const { currentUser } = useUserContext();
  return (
    <View style={styles.flexRow}>
      <View style={styles.flexRow}>
        {settings ? (
          <View style={{ marginLeft: 0 }}>
            <SettingsButton />
          </View>
        ) : (
          <>
            {currentUser && currentUser.profilePicture.length > 2 ? (
              <Image
                style={{ width: 45, height: 45, borderRadius: 50 }}
                source={{ uri: currentUser.profilePicture }}
              />
            ) : (
              <ProfilePic />
            )}
            <View style={{ marginLeft: 10 }}>
              <TextP color="black">Welcome back</TextP>
              <TextH2 color="black">{auth.currentUser?.displayName}</TextH2>
            </View>
          </>
        )}
      </View>
      <Logo width="70px" height="40px" />
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  logoView: {
    justifyContent: 'center',
  },
});
