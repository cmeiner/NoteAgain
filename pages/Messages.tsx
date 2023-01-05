import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DotsMenu } from '../src/components/DotsMenu';

export const Messages = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DotsMenu />
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
