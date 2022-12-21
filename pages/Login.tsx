import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { RegisterForm } from '../components/RegisterForm';
import { LoginForm } from '../components/LoginForm';

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Login screen</Text>
      <LoginForm />
      {/* <RegisterForm /> */}
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
  header: {
    fontSize: 20,
  },
});
