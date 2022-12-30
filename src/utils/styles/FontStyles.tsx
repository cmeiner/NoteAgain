import {
  Sora_100Thin,
  Sora_400Regular,
  Sora_700Bold,
  useFonts,
} from '@expo-google-fonts/sora';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  color: string;
  style?: ViewStyle;
};

export const TextH1: FC<Props> = ({ children, color, style }) => {
  useFonts({
    Sora_700Bold,
  });
  return (
    <Text style={color === 'white' ? fontStyles.wh1 : fontStyles.bh1}>
      {children}
    </Text>
  );
};

export const TextH2: FC<Props> = ({ children, color, style }) => {
  useFonts({
    Sora_700Bold,
  });
  return (
    <Text style={color === 'white' ? fontStyles.wh2 : fontStyles.bh2}>
      {children}
    </Text>
  );
};

export const TextH3: FC<Props> = ({ children, color, style }) => {
  useFonts({
    Sora_700Bold,
  });
  return (
    <Text style={color === 'white' ? fontStyles.wh3 : fontStyles.bh3}>
      {children}
    </Text>
  );
};

export const TextP: FC<Props> = ({ children, color, style }) => {
  useFonts({
    Sora_400Regular,
  });
  return (
    <Text style={color === 'white' ? fontStyles.wp : fontStyles.bp}>
      {children}
    </Text>
  );
};

export const TextThin: FC<Props> = ({ children, color, style }) => {
  useFonts({
    Sora_100Thin,
  });
  return (
    <Text style={color === 'white' ? fontStyles.wthin : fontStyles.bthin}>
      {children}
    </Text>
  );
};

const fontStyles = StyleSheet.create({
  wh1: {
    fontFamily: 'Sora_700Bold',
    fontSize: 60,
    color: '#F5F5F5',
  },
  wh2: {
    fontFamily: 'Sora_700Bold',
    fontSize: 20,
    color: '#F5F5F5',
  },
  wh3: {
    fontFamily: 'Sora_700Bold',
    fontSize: 30,
    color: '#F5F5F5',
  },
  wp: {
    fontFamily: 'Sora_400Regular',
    fontSize: 12,
    color: '#F5F5F5',
  },
  wthin: {
    fontFamily: 'Sora_100Thin',
    fontSize: 15,
    color: '#F5F5F5',
  },
  bh1: {
    fontFamily: 'Sora_700Bold',
    fontSize: 60,
  },
  bh2: {
    fontFamily: 'Sora_700Bold',
    fontSize: 20,
  },
  bh3: {
    fontFamily: 'Sora_700Bold',
    fontSize: 30,
  },
  bp: {
    fontFamily: 'Sora_400Regular',
    fontSize: 12,
  },
  bthin: {
    fontFamily: 'Sora_100Thin',
    fontSize: 24,
  },
});
