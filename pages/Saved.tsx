import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TextH1 } from '../src/utils/styles/FontStyles';

export const Saved = () => {
  const [exp, setExp] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TextH1 color="black">These are my saved</TextH1>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  outerBox: {
    width: 300,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 30,
  },
});
