import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '../components/LoginForm';
import { StyleSheet } from 'react-native';

export default function LoginPage() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
    </SafeAreaView>
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
