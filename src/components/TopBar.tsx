import React from 'react';
import { StyleSheet, View } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { TextH2, TextP } from '../utils/styles/FontStyles';
import { Logo, ProfilePic } from './SvgLibary';

export const TopBar = () => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.flexRow}>
        <ProfilePic />
        <View style={{ marginLeft: 10 }}>
          <TextP color="black">Welcome back</TextP>
          <TextH2 color="black">{auth.currentUser?.displayName}</TextH2>
        </View>
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
    height: 47,
  },
  logoView: {
    justifyContent: 'center',
  },
});
