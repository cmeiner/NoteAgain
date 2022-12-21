import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { loginUser, registerUser, usePost } from "./firebase/Hooks";
mport React from 'react';

export default function App() {
  const data = {
    email: "felix@x.se",
    password: "test12345",
    displayName: "test",
  };

  const test = () => {
    loginUser(data);
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
