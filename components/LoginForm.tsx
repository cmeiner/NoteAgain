import { Formik } from 'formik';
import React from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';

export const LoginForm = (props) => (
  <View style={styles.container}>
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text>Email</Text>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            style={{ width: 290, height: 100, backgroundColor: 'white' }}
          />
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.email}
          />

          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 414,
    backgroundColor: '#F5F5F5',
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
