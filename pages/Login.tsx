import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LoginForm } from '../src/components/LoginForm';
import { RegisterForm } from '../src/components/RegisterForm';

export const LoginPage = () => {
  const [register, setRegister] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image
        source={require('../assets/logo.png')}
        style={{ width: 350, height: 200 }}
      />
      {register ? (
        <View>
          <RegisterForm />
          <Text style={styles.linkText} onPress={() => setRegister(false)}>
            Already have an account?
          </Text>
        </View>
      ) : (
        <View>
          <LoginForm />
          <Text style={styles.linkText} onPress={() => setRegister(true)}>
            Don&apos;t have an acount yet?
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
  },
});
