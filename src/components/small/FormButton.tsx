import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
  title: string | any;
  width?: string;
  disabled?: boolean;
};

export const FormButton: FC<Props> = ({ onPress, title, width, disabled }) => {
  return (
    <Pressable
      style={width === '240px' ? styles.button240W : styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#D77451',
    marginTop: 'auto',
  },
  button240W: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 240,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#D77451',
    marginTop: 'auto',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
