import { useFonts } from 'expo-font';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: ReactNode;
};

export const TextH1: FC<Props> = ({ children }) => {
  useFonts({
    SoraBold: require('../../../assets/fonts/Sora-Bold.ttf'),
  });
  return <Text style={fontStyles.h1}>{children}</Text>;
};

export const TextH2: FC<Props> = ({ children }) => {
  useFonts({
    SoraBold: require('../../../assets/fonts/Sora-Bold.ttf'),
  });
  return <Text style={fontStyles.h2}>{children}</Text>;
};

export const TextH3: FC<Props> = ({ children }) => {
  useFonts({
    SoraBold: require('../../../assets/fonts/Sora-Bold.ttf'),
  });
  return <Text style={fontStyles.h3}>{children}</Text>;
};

export const TextP: FC<Props> = ({ children }) => {
  useFonts({
    SoraRegular: require('../../../assets/fonts/Sora-Regular.ttf'),
  });
  return <Text style={fontStyles.p}>{children}</Text>;
};

export const TextThin: FC<Props> = ({ children }) => {
  useFonts({
    SoraThin: require('../../../assets/fonts/Sora-Thin.ttf'),
  });
  return <Text style={fontStyles.thin}>{children}</Text>;
};

const fontStyles = StyleSheet.create({
  h1: {
    fontFamily: 'SoraBold',
    fontSize: 60,
  },
  h2: {
    fontFamily: 'SoraBold',
    fontSize: 48,
  },
  h3: {
    fontFamily: 'SoraBold',
    fontSize: 30,
  },
  p: {
    fontFamily: 'SoraRegular',
    fontSize: 24,
  },
  thin: {
    fontFamily: 'SoraThin',
    fontSize: 24,
  },
});
