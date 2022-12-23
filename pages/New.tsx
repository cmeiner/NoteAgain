import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TextH1 } from '../src/utils/styles/FontStyles';

export const New = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TextH1 color="black">This is my New screen</TextH1>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
