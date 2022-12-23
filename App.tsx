import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { auth } from './config/firebaseConfig';
import { createReminder } from './hooks/firebase/ReminderHooks';
import ReminderCard from './components/ReminderCard';

export default function App() {
  const data = {
    title: 'testTitle',
    description: 'testDesc',
    remindAt: 'test',
  };
  useFonts({
    SoraBold: require('./assets/fonts/Sora-Bold.ttf'),
    SoraRegular: require('./assets/fonts/Sora-Regular.ttf'),
    SoraThin: require('./assets/fonts/Sora-Thin.ttf'),
  });

  const test = () => {
    createReminder(data);
  };

  return (
    <View style={styles.container}>
      <ReminderCard title="Reminder 1" description="Pick up ur shit" />
      <Button title="test" onPress={() => alert('asd')} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
