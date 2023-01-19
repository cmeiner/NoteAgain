import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
  title: string | any;
  disabled?: boolean;
  small?: boolean;
};

export const FormButton: FC<Props> = ({ onPress, title, disabled, small }) => {
  return (
    <Pressable
      style={small ? styles.small : styles.button}
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
    width: 250,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#D77451',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  small: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    marginHorizontal: 5,
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#D77451',
  },
});
