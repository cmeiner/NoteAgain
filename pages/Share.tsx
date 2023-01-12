import React from 'react';
import { Button, SafeAreaView, StyleSheet } from 'react-native';
import { updateStatus_db } from '../hooks/firebase/ShareHooks';

export const Share = () => {
  const changeStatus = () => {
    updateStatus_db('ht4OvfiTrSQzh92HlaN9', 'accepted');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button onPress={changeStatus} title="Change Status" />
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
