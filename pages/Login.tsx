import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LoginForm } from '../src/components/LoginForm';
import { RegisterForm } from '../src/components/RegisterForm';
import { Logo } from '../src/components/SvgLibary';

export const Login = () => {
  const [register, setRegister] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Logo width="300px" height="196px" />
      <View style={{ marginTop: 24 }}>
        {register ? (
          <>
            <RegisterForm />
            <Text style={styles.linkText} onPress={() => setRegister(false)}>
              Already have an account?
            </Text>
          </>
        ) : (
          <>
            <LoginForm />
            <Text style={styles.linkText} onPress={() => setRegister(true)}>
              Don&apos;t have an acount yet?
            </Text>
          </>
        )}
      </View>
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
    color: 'black',
    marginTop: 10,
  },
});
