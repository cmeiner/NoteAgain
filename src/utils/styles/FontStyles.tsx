import { useFonts } from 'expo-font';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: ReactNode;
  color: string;
};

export const TextH1: FC<Props> = ({ children, color }) => {
  useFonts({
    SoraBold: require('../../../assets/fonts/Sora-Bold.ttf'),
  });
  return (
    <Text style={color === 'white' ? fontStyles.wh1 : fontStyles.bh1}>
      {children}
    </Text>
  );
};

export const TextH2: FC<Props> = ({ children, color }) => {
  useFonts({
    SoraBold: require('../../../assets/fonts/Sora-Bold.ttf'),
  });
  return (
    <Text style={color === 'white' ? fontStyles.wh2 : fontStyles.bh2}>
      {children}
    </Text>
  );
};

export const TextH3: FC<Props> = ({ children, color }) => {
  useFonts({
    SoraBold: require('../../../assets/fonts/Sora-Bold.ttf'),
  });
  return (
    <Text style={color === 'white' ? fontStyles.wh3 : fontStyles.bh3}>
      {children}
    </Text>
  );
};

export const TextP: FC<Props> = ({ children, color }) => {
  useFonts({
    SoraRegular: require('../../../assets/fonts/Sora-Regular.ttf'),
  });
  return (
    <Text style={color === 'white' ? fontStyles.wp : fontStyles.bp}>
      {children}
    </Text>
  );
};

export const TextThin: FC<Props> = ({ children, color }) => {
  useFonts({
    SoraThin: require('../../../assets/fonts/Sora-Thin.ttf'),
  });
  return (
    <Text style={color === 'white' ? fontStyles.wthin : fontStyles.bthin}>
      {children}
    </Text>
  );
};

const fontStyles = StyleSheet.create({
  wh1: {
    fontFamily: 'SoraBold',
    fontSize: 60,
    color: '#F5F5F5',
  },
  wh2: {
    fontFamily: 'SoraBold',
    fontSize: 48,
    color: '#F5F5F5',
  },
  wh3: {
    fontFamily: 'SoraBold',
    fontSize: 30,
    color: '#F5F5F5',
  },
  wp: {
    fontFamily: 'SoraRegular',
    fontSize: 24,
    color: '#F5F5F5',
  },
  wthin: {
    fontFamily: 'SoraThin',
    fontSize: 24,
    color: '#F5F5F5',
  },
  bh1: {
    fontFamily: 'SoraBold',
    fontSize: 60,
  },
  bh2: {
    fontFamily: 'SoraBold',
    fontSize: 48,
  },
  bh3: {
    fontFamily: 'SoraBold',
    fontSize: 30,
  },
  bp: {
    fontFamily: 'SoraRegular',
    fontSize: 24,
  },
  bthin: {
    fontFamily: 'SoraThin',
    fontSize: 24,
  },
});
