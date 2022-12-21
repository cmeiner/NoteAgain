import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { loginUser, registerUser } from "./firebase/hooks/UserHooks";
import React from 'react';
import { createReminder } from "./firebase/hooks/ReminderHooks";
import { auth } from "./config/firebaseConfig";

export default function App() {
  auth.signOut()
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
