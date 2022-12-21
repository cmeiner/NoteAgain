import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';
import { RegisterForm } from '../components/RegisterForm';

export default function Home({ navigation, route }) {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>"home screen"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
