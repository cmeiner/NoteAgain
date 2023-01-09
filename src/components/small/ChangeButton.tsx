import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
  title: string | any;
  width?: string;
};

export const ChangeButton: FC<Props> = ({ onPress, title, width }) => {
  return (
    <Pressable
      style={width === '250px' ? styles.button250W : styles.button}
      onPress={onPress}
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
  button250W: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#D77451',
    marginTop: 'auto',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
