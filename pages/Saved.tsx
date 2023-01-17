import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { TextH1, TextH3 } from '../src/utils/styles/FontStyles';

export const Saved = () => {
  const [exp, setExp] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.outerBox}
        onPress={() => setExp((prevState) => !prevState)}
      >
        <TextH1 color="white">asd</TextH1>
        {exp ? <TextH3 color="white">asd</TextH3> : null}
      </Pressable>
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
