import {
  Sora_100Thin,
  Sora_400Regular,
  Sora_700Bold,
  useFonts,
} from '@expo-google-fonts/sora';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: ReactNode;
};

export const TextH1: FC<Props> = ({ children }) => {
  useFonts({
    Sora_700Bold,
  });
  return <Text style={fontStyles.h1}>{children}</Text>;
};

export const TextH2: FC<Props> = ({ children }) => {
  useFonts({
    Sora_700Bold,
  });
  return <Text style={fontStyles.h2}>{children}</Text>;
};

export const TextH3: FC<Props> = ({ children }) => {
  useFonts({
    Sora_700Bold,
  });
  return <Text style={fontStyles.h3}>{children}</Text>;
};

export const TextP: FC<Props> = ({ children }) => {
  useFonts({
    Sora_400Regular,
  });
  return <Text style={fontStyles.p}>{children}</Text>;
};

export const TextThin: FC<Props> = ({ children }) => {
  useFonts({
    Sora_100Thin,
  });
  return <Text style={fontStyles.thin}>{children}</Text>;
};

const fontStyles = StyleSheet.create({
  h1: {
    fontFamily: 'Sora_700Bold',
    fontSize: 60,
    textAlign: 'center',
  },
  h2: {
    fontFamily: 'Sora_700Bold',
    fontSize: 48,
  },
  h3: {
    fontFamily: 'Sora_700Bold',
    fontSize: 30,
  },
  p: {
    fontFamily: 'Sora_400Regular',
    fontSize: 24,
  },
  thin: {
    fontFamily: 'Sora_100Thin',
    fontSize: 24,
  },
});
