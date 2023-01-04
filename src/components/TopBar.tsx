import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { TextH2, TextP } from '../utils/styles/FontStyles';
import { Logo, ProfilePic } from './SvgLibary';

type Props = {
  settings: boolean;
};

export const TopBar = ({ settings }: Props) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.flexRow}>
        {!settings && <ProfilePic />}
        {!settings ? (
          <View style={{ marginLeft: 10 }}>
            <TextP color="black">Welcome back</TextP>
            <TextH2 color="black">{auth.currentUser?.displayName}</TextH2>
          </View>
        ) : (
          <View style={{ marginLeft: 0 }}>
            <Ionicons name="settings-sharp" size={35} color="#D77451" />
          </View>
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
    height: 47,
  },
  logoView: {
    justifyContent: 'center',
  },
});
