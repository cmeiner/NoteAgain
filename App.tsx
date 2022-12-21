import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import React from 'react';
import { auth } from "./config/firebaseConfig";
import { createReminder } from "./hooks/firebase/ReminderHooks";

export default function App() {
  const data = {
    title: "testTitle",
    description: "testDesc",
    remindAt: "test"
  };

  const test = () => {
    createReminder(data)
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="test" onPress={() => test()} />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
