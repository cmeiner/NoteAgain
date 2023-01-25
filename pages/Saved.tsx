import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TopBar } from '../src/components/TopBar';
import { TextH3 } from '../src/utils/styles/FontStyles';

export const Saved = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          top: 500,
        }}
        source={require('../assets/images/Wave.png')}
      />
      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <TopBar />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextH3 color="black">Currently under</TextH3>
        <TextH3 color="black">construction</TextH3>
        <Text style={{ fontSize: 200 }}>🚧</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
  },
});
