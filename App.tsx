import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import {
  TextH1,
  TextH2,
  TextH3,
  TextP,
  TextThin,
} from './src/utils/styles/FontStyles';
import { auth } from "./config/firebaseConfig";
import { createReminder } from "./hooks/firebase/ReminderHooks";

export default function App() {
  const data = {
    title: "testTitle",
    description: "testDesc",
    remindAt: "test"
  };
   useFonts({
    SoraBold: require('./assets/fonts/Sora-Bold.ttf'),
    SoraRegular: require('./assets/fonts/Sora-Regular.ttf'),
    SoraThin: require('./assets/fonts/Sora-Thin.ttf'),
  });

  const test = () => {
    createReminder(data)
  };

  return (
    <View style={styles.container}>
      <TextH1>Detta är H1</TextH1>
      <TextH2>Detta är H2</TextH2>
      <TextH3>Detta är H3</TextH3>
      <TextP>Denna P-tag</TextP>
      <TextThin>Typ P fast Thin</TextThin>
      <Button title="test" onPress={() => alert('asd')} />
      <StatusBar style="auto" />
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
});