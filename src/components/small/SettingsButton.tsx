import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
};

export const SettingsButton: FC<Props> = ({ onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons name="settings-sharp" size={35} color="#D77451" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    borderRadius: 10,
    elevation: 3,
    marginTop: 'auto',
  },
});
